const fetch = require('node-fetch')



function PasswordResetPage(req, res) {
    if (!req.query.token) return res.status(400).send('Reset Token Missing!')
    if (!PWResetCache[req.query.token]) return res.render('auth/password-reset', { expired: true })
    res.render('auth/password-reset')

}

var PWResetCache = {}
async function InitiatePasswordReset(req, res) {
    if (!res.locals.user) return res.status(401).send('Unauthorized')
    var User = await process.db.collection('users').findOne({ _id: res.locals.user._id })
    if (!User) return res.status(500).send('Failed to find user in the database!')
    var resetToken = await require('../util/security').GenerateToken()
    PWResetCache[resetToken] = res.locals.user._id, setTimeout(() => { delete PWResetCache[resetToken] }, 1000 * 60 * 10)

    if (!User.email) return res.status(201).send(resetToken)

    require('../util/email').Send(res.locals.user.email, 'Account Security', `Hey ${res.locals.user.display.name}, this email is regarding the password reset you requested on our website, if you did not make any requests then please ignore this email.\n${process.env.site.root}/reset/password?token=${resetToken}`)

    res.status(200).send()
}

async function ChangePassword(req, res) {
    if (!PWResetCache[req.body.token]) return res.status(400).send('Token Expired')
    if (!require('../util/security').CheckPasswordRequirements(req.body.password)) return res.status(400).send('Password must be at least 8 characters long and contain at least one number, lowercase, uppercase, and special character')
    var User = await process.db.collection('users').findOne({ _id: PWResetCache[req.body.token] })
    if (await require('../util/security').Verify(req.body.password, User.security.password)) return res.status(400).send('New password must be different from the old password')
    
    User.security.password = await require('../util/security').Hash(req.body.password)
    User.security.token = await require('../util/security').GenerateToken()
    await process.db.collection('users').updateOne({ _id: User._id }, { $set: { security: User.security } })

    delete PWResetCache[req.body.token]
    
    res.status(200).send(User.security.token)
}




module.exports = {

    //? Password Management
    PasswordResetPage: PasswordResetPage,
    InitiatePasswordReset: InitiatePasswordReset,
    ChangePassword: ChangePassword

    //? Email Management

}