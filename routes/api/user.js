const crypto = require('crypto')

var UserRegisterCache = {}
async function Register(req, res) {
    var override = false
    if (req.query.token !== process.env.security.token) {
        var required = ['name', 'password', 'email']
        if (required.some(x => !req.body[x])) return res.status(400).send('Missing parameter(s)')
    } else override = true

    var Users = await process.db.collection('users')
    if (await Users.findOne({ email: req.body.email })) return res.status(400).send('Email is taken!')

    if (!override) {
        if (req.body.name.match(/[a-zA-Z0-9 _()]/)) return res.status(400).send('Display name can only contain letters, numbers, spaces, underscores, and brackets')
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

    if (!override) password = process.security.Hash(req.body.password)
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
            color: '#ffffff'
        },
        security: {
            password: password,
            token: await process.security.GenerateToken(),
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

    return await Users.insertOne(user).then(() => res.status(201).send(user))
}

async function Login(req, res) {
    if (!req.query.email || !req.query.password) return res.status(400).send('Missing parameter(s)')
    req.query.email = req.query.email.toLowerCase()
    var Users = await process.db.collection('users')
    var user = await Users.findOne({ email: req.query.email })
    if (!user) return res.status(400).send('Invalid email or password!')
    if (!process.security.Verify(req.query.password, user.security.password)) return res.status(400).send('Invalid email or password!')

    user.security.lastLoginAddress = req.ip
    await Users.updateOne({ email: req.query.email }, { $set: { security: user.security } })
    return res.status(200).send({ token: user.security.token })
}



module.exports = {
    Register: Register,
    Login: Login
}