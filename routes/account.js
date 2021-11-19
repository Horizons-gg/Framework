const fetch = require('node-fetch')



function AccountGet(req, res) {
    if (!res.locals.user) return res.redirect('/login')
    res.render('account/account')
}

async function AccountUpdate(req, res) {
    if (!res.locals.user) return res.status(401).send('Unauthorized Access.')

    var data = req.body
    var Users = await process.db.collection('users')
    var User = await Users.findOne({ _id: res.locals.user._id })


    if (data.displayName.match(/[^a-zA-Z0-9 _()]/)) return res.status(400).send('Display name can only contain letters, numbers, spaces, underscores, and brackets')
    if (data.color.match(/[^a-zA-Z0-9#]/) || data.color.length !== 7) return res.status(400).send('Color is invalid')

    if (data.firstName.match(/[^a-zA-Z0-9 ]/) || data.lastName.match(/[^a-zA-Z0-9 ]/)) return res.status(400).send('First & Last name can only contain letters, numbers and spaces')
    if (new Date(data.dob) === 'Invalid Date') data.dob = null
    if (!['None', 'Male', 'Female', 'Other'].includes(data.gender)) return res.status(400).send('Gender is Invalid')
    
    var personalityTypes = ['INFP', 'INTJ', 'INFJ', 'INTP', 'ENFP', 'ENTJ', 'ENTP', 'ENFJ', 'ISFJ', 'ISFP', 'ISTJ', 'ISTP', 'ESFJ', 'ESFP', 'ESTJ', 'ESTP']
    if (!personalityTypes.includes(decodeURI(data.personality).split(' - ')[0]) && decodeURI(data.personality) !== 'None') return res.status(400).send('Invalid Personality Type')

    


    User.display.name = data.displayName
    User.display.color = data.color

    User.details.firstName = data.firstName
    User.details.lastName = data.lastName
    User.details.dob = data.dob
    User.details.gender = data.gender
    User.details.personality = data.personality
    User.details.bio = encodeURI(data.bio)

    Users.updateOne({ _id: User._id }, { $set: User })

    res.status(200).send()
}



module.exports = {
    AccountGet: AccountGet,
    AccountUpdate: AccountUpdate
}