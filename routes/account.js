const fetch = require('node-fetch')



function AccountGet(req, res) {
    if (!res.locals.user) return res.redirect('/login')
    res.locals.user = JSON.parse(decodeURI(JSON.stringify(res.locals.user)))

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

    if (!new Date(data.dob)) return res.status(400).send('Invalid Date of Birth')

    User.display.color = data.color

    User.details.firstName = data.firstName
    User.details.lastName = data.lastName
    User.details.dob = data.dob
    User.details.gender = data.gender
    User.details.personality = decodeURI(data.personality)
    User.details.bio = data.bio

    Users.updateOne({ _id: User._id }, { $set: User })

    res.status(200).send()
}



module.exports = {
    AccountGet: AccountGet,
    AccountUpdate: AccountUpdate
}