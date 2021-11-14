const fetch = require('node-fetch')



function AccountGet(req, res) {
    if (!res.locals.user) return res.redirect('/login')

    res.render('account/account')
}

async function AccountUpdate(req, res) {

    if (!res.locals.user) return res.status(401).send('Unauthorized Access.')

    var data = req.body
    for (key in data) {
        if (typeof data[key] === 'string') data[key] = encodeURI(data[key].trim())
    }


    var Users = await process.db.collection('users')
    var User = await Users.findOne({ _id: res.locals.user._id })

    var personalityTypes = ['INFP', 'INTJ', 'INFJ', 'INTP', 'ENFP', 'ENTJ', 'ENTP', 'ENFJ', 'ISFJ', 'ISFP', 'ISTJ', 'ISTP', 'ESFJ', 'ESFP', 'ESTJ', 'ESTP']
    if (!personalityTypes.includes(decodeURI(data.personality).split(' - ')[0]) && decodeURI(data.personality) !== 'None') return res.status(400).send('Invalid Personality Type')

    User.details.firstName = data.firstName
    User.details.lastName = data.lastName
    User.details.dob = new Date(data.dob)
    User.details.gender = data.gender
    User.details.personality = decodeURI(data.personality).split(' - ')[0]
    User.details.bio = data.bio

    Users.updateOne({ _id: User._id }, { $set: { details: User.details } })

    res.status(200).send()
}



module.exports = {
    AccountGet: AccountGet,
    AccountUpdate: AccountUpdate
}