const fetch = require('node-fetch')
const crypto = require('crypto')



//? Login Requests
function LoginGet(req, res) {
    if (req.query.token) return res.cookie('token', req.query.token, { httpOnly: true, secure: process.env.site.root.includes('https'), maxAge: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14) }).redirect(decodeURI(req.query.redirect || '/account'))
    if (res.locals.user) return res.redirect('/account')
    res.render('auth/login')
}
async function LoginPost(req, res) {
    if (!req.body.email || !req.body.password) return res.status(400).send('Missing parameter(s)')
    req.body.email = req.body.email.toLowerCase()
    var Users = await process.db.collection('users')
    var user = await Users.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email or password!')
    if (!require('../util/security').Verify(req.body.password, user.security.password)) return res.status(400).send('Invalid email or password!')

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
    var override = false
    if (req.query.token !== process.env.security.token) {
        var required = ['name', 'password', 'email']
        if (required.some(x => !req.body[x])) return res.status(400).send('Missing parameter(s)')
    } else override = true

    var Users = await process.db.collection('users')
    if (await Users.findOne({ email: req.body.email })) return res.status(400).send('Email is taken!')

    if (!override) {
        if (req.body.name.match(/[^a-zA-Z0-9 _()]/)) return res.status(400).send('Display name can only contain letters, numbers, spaces, underscores, and brackets')
        if (!req.body.email.includes('@') || !req.body.email.includes('.')) return res.status(400).send('Email is invalid!')
        if (req.body.password.length < 8) return res.status(400).send('Password must be at least 8 characters long!')

        if (!req.body.code) {
            if (UserRegisterCache[req.body.email]) delete UserRegisterCache[req.body.email]
            UserRegisterCache[req.body.email] = {
                code: crypto.randomBytes(10).toString('base64url'),
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
    }

    var UUID = null
    while (!UUID) {
        tempUUID = crypto.randomUUID()
        if (!await Users.findOne({ _id: tempUUID })) UUID = tempUUID
    }

    if (!override) password = require('../util/security').Hash(req.body.password)
    else password = req.body.password

    var user = {
        _id: UUID,
        email: req.body.email,
        created: new Date(),
        welcome: true,
        display: {
            name: req.body.name,
            avatar: req.body.avatar || 'none',
            banner: req.body.banner || 'none',
            color: '#000000'
        },
        security: {
            password: password,
            token: await require('../util/security').GenerateToken(),
            lastLoginAddress: req.ip
        },
        permissions: {
            administrator: false
        },
        details: {
            firstName: "",
            lastName: "",
            dob: "",
            gender: "None",
            personality: "None",
            business: "",
            bio: "",
            location: {
                address: "",
                apartment: "",
                city: "",
                state: "",
                country: "",
                zip: ""
            }
        },
        connections: {
            discord: req.body.discord || {},
            steam: req.body.steam || {},
            google: req.body.google || {},
            microsoft: req.body.microsoft || {},
            github: req.body.github || {},
            patreon: req.body.patreon || {}
        }
    }

    if (req.query.token === process.env.security.token && req.query.service) {
        user.connections[req.query.service] = req.body.data
    }

    return await Users.insertOne(user).then(() => res.status(201).send(user.security.token))
}


//? Logout Requests
function Logout(req, res) {
    res.cookie("token", undefined, { maxAge: 1 })
    res.render('auth/logout')
}


//? OAuth2 Requests
async function Discord(req, res) {
    var token
    if (res.locals.user) token = res.locals.user.security.token
    var Users = await process.db.collection('users')
    if (token) {
        var User = res.locals.user
        if (User.connections.discord.id) return res.redirect('/account')
        if (User) {
            if (await Users.findOne({ 'connections.discord.id': req.user.id })) return res.status(400).send('This discord account is linked to a preexisting account.')
            if (!User.email) User.email = req.user.email
            User.connections.discord = req.user
            await Users.updateOne({ '_id': User._id }, { $set: User })
            return res.redirect('/account')
        }
    }

    var User = await Users.findOne({ 'connections.discord.id': req.user.id })
    if (User) {
        res.cookie('token', User.security.token)
        return res.redirect('/account')
    } else {
        var User = await Users.findOne({ 'email': req.user.email })
        if (User) {
            await Users.updateOne({ '_id': User._id }, { $set: { 'connections.discord': req.user } })
            res.cookie('token', User.security.token)
            return res.redirect('/account')
        }
        else fetch(`/register?token=${process.env.security.token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: req.user.username,
                email: req.user.email || null,
                password: null,
                avatar: 'discord',
                banner: 'discord',
                discord: req.user
            })
        })
            .then(async response => {
                if (response.status !== 201) return res.status(400).send(await response.text())
                response = await response.json()
                res.cookie('token', response.security.token)
                res.redirect('/account')
            })
            .catch(err => res.status(500).send(err))
    }
}

async function Steam(req, res) {
    var token
    if (res.locals.user) token = res.locals.user.security.token
    var Users = await process.db.collection('users')
    if (token) {
        var User = res.locals.user
        if (User.connections.steam.id) return res.redirect('/account')
        if (User) {
            if (await Users.findOne({ 'connections.steam.id': req.user.id })) return res.status(400).send('This discord account is linked to a preexisting account.')
            await Users.updateOne({ '_id': User._id }, { $set: { 'connections.steam': req.user } })
            return res.redirect('/account')
        }
    }

    var User = await Users.findOne({ 'connections.steam.id': req.user.id })
    if (User) {
        res.cookie('token', User.security.token)
        return res.redirect('/account')
    } else {
        fetch(`/register?token=${process.env.security.token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: req.user.displayName,
                email: null,
                password: null,
                avatar: 'steam',
                banner: 'none',
                steam: req.user
            })
        })
            .then(async response => {
                if (response.status !== 201) return res.status(400).send(await response.text())
                response = await response.json()
                res.cookie('token', response.security.token)
                res.redirect('/account')
            })
            .catch(err => res.status(500).send(err))
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
    Discord: Discord,
    Steam: Steam
}