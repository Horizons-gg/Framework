const Security = require('../util/security')
const Schema = require('../util/schema')

const fetch = require('node-fetch')
const crypto = require('crypto')

const LoginCache = {}



//? Login Requests
function LoginGet(req, res) {
    if (req.query.token) return res.cookie('token', req.query.token, { httpOnly: true, secure: process.env.site.root.includes('https'), maxAge: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14) }).redirect(decodeURI(req.query.redirect || '/account'))
    if (res.locals.user) return res.redirect('/account')
    res.render('auth/login')
}
async function LoginPost(req, res) {
    if (LoginCache[req.ip]) {
        if (LoginCache[req.ip].attempts >= 10) return res.status(429).send('Too many login attempts, try again later.')
        if (!LoginCache[req.ip].timer) setTimeout(() => { delete LoginCache[req.ip] }, 1000 * 60 * 15), LoginCache[req.ip].timer = true
    }

    if (!req.body.email || !req.body.password) return res.status(400).send('Missing parameter(s)')
    req.body.email = req.body.email.toLowerCase()
    var Users = await process.db.collection('users')
    var user = await Users.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email or password!')
    if (!Security.Verify(req.body.password, user.security.password)) return setTimeout(() => { res.status(400).send('Invalid email or password!') }, Math.floor(Math.random() * 500)), LoginCache[req.ip] ? LoginCache[req.ip].attempts += 1 : LoginCache[req.ip] = { attempts: 1, time: Date.now(), timer: false }
    if (LoginCache[req.ip]) delete LoginCache[req.ip]

    user.security.lastLoginAddress = req.ip
    await Users.updateOne({ email: req.body.email }, { $set: { security: user.security } })
    return res.status(200).send(user.security.token)
}


//? Registration Requests
function RegisterGet(req, res) {
    if (res.locals.user) return res.redirect('/account')
    res.render('auth/register')
}

var UserRegisterCache = {}
async function RegisterPost(req, res) {
    var required = ['name', 'password', 'email']
    if (required.some(x => !req.body[x])) return res.status(400).send('Missing parameter(s)')

    var Users = await process.db.collection('users')
    if (await Users.findOne({ email: req.body.email })) return res.status(400).send('Email is taken!')

    if (req.body.name.match(/[^a-zA-Z0-9 _()]/)) return res.status(400).send('Display name can only contain letters, numbers, spaces, underscores, and brackets')
    if (!req.body.email.includes('@') || !req.body.email.includes('.')) return res.status(400).send('Email is invalid!')
    if (!Security.CheckPasswordRequirements(req.body.password)) return res.status(400).send('Password must be at least 8 characters long and contain at least one number, lowercase, uppercase, and special character')

    if (!req.body.code) {
        if (UserRegisterCache[req.body.email]) delete UserRegisterCache[req.body.email]
        UserRegisterCache[req.body.email] = {
            code: Math.floor(Math.random() * 1000000).toString(),
            password: req.body.password
        }
        setTimeout(() => { delete UserRegisterCache[req.body.email] }, 1000 * 60 * 10)

        require('../util/email').Send(req.body.email, 'Account Activation', `Hey ${req.body.name}, thankyou for creating an account with us, please use the following code to activate your account.\n\nActivation Code: ${UserRegisterCache[req.body.email].code}`)
        return res.status(200).send(`Activation code sent to ${req.body.email}`)
    } else {
        if (!UserRegisterCache[req.body.email]) return res.status(400).send('This activation code has expired!')
        if (UserRegisterCache[req.body.email].password !== req.body.password) return res.status(400).send('Passwords do not match!')
        if (UserRegisterCache[req.body.email].code !== req.body.code) return res.status(400).send('Invalid activation code!')
        delete UserRegisterCache[req.body.email]
    }

    var User = await Schema.User()
    User.email = req.body.email
    User.display.name = req.body.name
    User.security.password = Security.Hash(req.body.password)
    User.security.lastLoginAddress = req.ip

    return await Users.insertOne(User).then(() => res.status(201).send(User.security.token))
}


//? Logout Requests
function Logout(req, res) {
    res.cookie("token", undefined, { maxAge: 1 })
    res.render('auth/logout')
}


//? OAuth2 Requests
async function UnlinkAuth(req, res) {
    if (!res.locals.user) return res.status(401).send()
    var provider = req.path.split('/')[2]
    var Users = await process.db.collection('users')
    var User = await Users.findOne({ _id: res.locals.user._id })

    if (!User.email) return res.status(400).send(`Please add an email address to your account before attempting to unlink ${provider}`)
    if (!User.security.password) return res.status(400).send(`Please add a password to your account before attempting to unlink ${provider}`)

    User.connections[provider] = {}
    await Users.updateOne({ _id: res.locals.user._id }, { $set: { connections: User.connections } }).then(() => res.status(200).send())
}

async function Discord(req, res) {
    var Users = await process.db.collection('users')
    if (res.locals.user) {
        var User = res.locals.user
        if (User) {
            var ConnectionUser = await Users.findOne({ 'connections.discord.id': req.user.id })
            if (ConnectionUser && ConnectionUser._id !== User._id) return res.status(400).send('This discord account is linked to a preexisting account.')
            if (!User.email) User.email = req.user.email
            User.connections.discord = req.user
            await Users.updateOne({ '_id': User._id }, { $set: { 'connections.discord': req.user } })
            return res.redirect('/account')
        }
    }

    var User = await Users.findOne({ 'connections.discord.id': req.user.id })
    if (User) {
        return res.redirect(`/login?token=${User.security.token}`)
    } else {
        var User = await Users.findOne({ 'email': req.user.email })
        if (User) {
            await Users.updateOne({ '_id': User._id }, { $set: { 'connections.discord': req.user } })
            res.cookie('token', User.security.token)
            return res.redirect('/account')
        }
        else {
            var User = await Schema.User()
            User.email = req.user.email || null
            User.display.name = req.user.username
            User.display.avatar = 'discord'
            User.display.banner = 'discord'
            User.connections.discord = req.user
            User.security.lastLoginAddress = req.ip

            await Users.insertOne(User).then(() => res.redirect(`/login?token=${User.security.token}`))
        }
    }
}

async function Steam(req, res) {
    var Users = await process.db.collection('users')
    if (res.locals.user) {
        var User = res.locals.user
        if (User.connections.steam.id) return res.redirect('/account')
        if (User) {
            var ConnectionUser = await Users.findOne({ 'connections.steam.id': req.user.id })
            if (ConnectionUser && ConnectionUser._id !== User._id) return res.status(400).send('This steam account is linked to a preexisting account.')
            if (!User.email) User.email = req.user.email
            User.connections.discord = req.user
            await Users.updateOne({ '_id': User._id }, { $set: { 'connections.steam': req.user } })
            return res.redirect('/account')
        }
    }

    var User = await Users.findOne({ 'connections.steam.id': req.user.id })
    if (User) {
        return res.redirect(`/login?token=${User.security.token}`)
    } else {
        var User = await Schema.User()
        User.display.name = req.user.displayName
        User.display.avatar = 'steam'
        User.connections.steam = req.user
        User.security.lastLoginAddress = req.ip

        await Users.insertOne(User).then(() => res.redirect(`/login?token=${User.security.token}`))
    }
}


module.exports = {

    //? Horizons
    LoginGet: LoginGet,
    LoginPost: LoginPost,

    RegisterGet: RegisterGet,
    RegisterPost: RegisterPost,

    Logout: Logout,


    //? OAuth2
    UnlinkAuth: UnlinkAuth,
    Discord: Discord,
    Steam: Steam
}