const fetch = require('node-fetch')



//? Login Requests
function LoginGet(req, res) {
    if (res.locals.user) return res.redirect('/account')

    res.render('auth/login')
}
function LoginPost(req, res) {
    fetch(`${process.env.api}/user/login?email=${req.body.email}&password=${req.body.password}`)
        .then(res => res.json())
        .then(data => res.status(200).send(data.token))
        .catch(err => res.status(400).send(err))
}


//? Registration Requests
function RegisterGet(req, res) {
    if (res.locals.user) return res.redirect('/account')

    res.render('auth/register')
}
function RegisterPost(req, res) {
    fetch(`${process.env.api}/user/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            code: req.body.code
        })
    })
        .then(async response => {
            if (response.status === 200) {
                return res.status(200).send(`Activation code sent to ${req.body.email}`)
            }
            if (response.status === 201) {
                var data = await response.json()
                return res.status(201).send(data.security.token)
            }
            if (response.status === 400) {
                return res.status(400).send(await response.text())
            }
            else {
                return res.status(500).send('Something went wrong, please contact support if this issue persists.')
            }
        })
        .catch(err => console.log(err))
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
        var User = await Users.findOne({ 'security.token': token })
        if (User) {
            if (await Users.findOne({ 'connections.discord.id': req.user.id })) return res.status(400).send('This discord account is linked to a preexisting account.')
            await Users.updateOne({ '_id': User._id }, { $set: { 'connections.discord': req.user } })
            return res.redirect('/account')
        }
    }

    var User = await Users.findOne({ 'connections.discord.id': req.user.id })
    if (User) {
        res.cookie('token', User.security.token)
        return res.redirect('/account')
    } else {
        var User = await Users.findOne({ 'email': req.user.email })
        if (User) return res.status(400).send(`An account using this email (${req.user.email}) already exists, please login to your account and link your discord account from there.`)
        fetch(`${process.env.api}/user/create?token=${process.env.security.token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: req.user.username,
                email: req.user.email,
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


module.exports = {

    //? Horizons
    LoginGet: LoginGet,
    LoginPost: LoginPost,

    RegisterGet: RegisterGet,
    RegisterPost: RegisterPost,

    Logout: Logout,


    //? OAuth2
    Discord: Discord
}