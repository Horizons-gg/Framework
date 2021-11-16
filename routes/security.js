


var PWResetCache = {}
async function InitiatePasswordReset(req, res) {
    if (!req.query.email) return res.status(400).send('Email is required')
    var User = await process.db.collection('users').findOne({ email: req.query.email })
    if (!User) return res.status(400).send('User with this email does not exist')

}


module.exports = {
    InitiatePasswordReset: InitiatePasswordReset
}