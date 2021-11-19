const fetch = require('node-fetch')


var PWResetCache = {}
async function InitiatePasswordReset(req, res) {
    if (!res.locals.user) return res.status(401).send('Unauthorized')
    var User = await process.db.collection('users').findOne({ _id: res.locals.user._id })
    if (!User) return res.status(500).send('Failed to find user in the database!')
    var resetToken = await require('../util/security').GenerateToken()
    PWResetCache[res.locals.user._id] = resetToken, setTimeout(() => { delete PWResetCache[res.locals.user._id] }, 1000 * 60 * 10)
    
    if (!User.email) return res.status(201).send(resetToken)

    require('../util/email').Send(res.locals.user.email, 'Account Security', `Hey ${res.locals.user.display.name}, this email is regarding the password reset you requested on our website, if you did not make any requests then please ignore this email.\n${process.env.site.root}/reset/password?token=${resetToken}`)

    res.status(200).send()
}

async function PasswordResetPage(req, res) {
    if (!req.query.token) return res.status(400).send('Reset Token Missing!')
    res.render('auth/password-reset')
    
}


module.exports = {
    InitiatePasswordReset: InitiatePasswordReset,
    PasswordResetPage: PasswordResetPage
}