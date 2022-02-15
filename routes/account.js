const fetch = require('node-fetch')



function AccountGet(req, res) {
    if (!res.locals.user) return res.redirect('/login')

    res.locals.user.details.bio = decodeURI(res.locals.user.details.bio)
    res.locals.site.host = req.headers.host

    res.render('account/account')
}

async function AccountUpdate(req, res) {
    if (!res.locals.user) return res.status(401).send('Unauthorized Access.')

    if (req.query.theme) {
        var Users = await process.db.collection('users')
        var User = await Users.findOne({ _id: res.locals.user._id })

        if (User.display.theme === 'dark') User.display.theme = 'light'
        else if (User.display.theme === 'light') User.display.theme = 'dark'
        return Users.updateOne({ _id: User._id }, { $set: User }).then(() => res.status(200).send())
    }

    var data = req.body
    var Users = await process.db.collection('users')
    var User = await Users.findOne({ _id: res.locals.user._id })


    if (data.displayName.length < 3) return res.status(400).send('Display name must be longer than 2 characters')
    if (data.displayName.match(/[^a-zA-Z0-9 _()-]/)) return res.status(400).send('Display name can only contain letters, numbers, spaces, underscores, and brackets')
    if (data.color.match(/[^a-zA-Z0-9#]/) || data.color.length !== 7) return res.status(400).send('Color is invalid')

    if (data.profileurl) {
        if (data.profileurl.match(/[^a-zA-Z0-9_-]/)) return res.status(400).send('Profile URL can only contain letters and numbers')
        var URLUser = await Users.findOne({ "display.profileurl": data.profileurl })
        if (URLUser) if (URLUser._id !== User._id) return res.status(400).send('Profile URL is already taken')
    }

    if (data.firstName.match(/[^a-zA-Z0-9 ]/) || data.lastName.match(/[^a-zA-Z0-9 ]/)) return res.status(400).send('First & Last name can only contain letters, numbers and spaces')
    if (new Date(data.dob) === 'Invalid Date') data.dob = null
    if (!['None', 'He / Him', 'She / Her', 'They / Them'].includes(data.pronouns)) return res.status(400).send('Pronouns are Invalid')

    var personalityTypes = ['INFP', 'INTJ', 'INFJ', 'INTP', 'ENFP', 'ENTJ', 'ENTP', 'ENFJ', 'ISFJ', 'ISFP', 'ISTJ', 'ISTP', 'ESFJ', 'ESFP', 'ESTJ', 'ESTP']
    if (!personalityTypes.includes(decodeURI(data.personality).split(' - ')[0]) && decodeURI(data.personality) !== 'None') return res.status(400).send('Invalid Personality Type')




    User.display.name = data.displayName
    User.display.color = data.color
    User.display.profileurl = data.profileurl

    User.details.firstName = data.firstName
    User.details.lastName = data.lastName
    User.details.dob = data.dob
    User.details.pronouns = data.pronouns
    User.details.personality = data.personality
    User.details.bio = encodeURI(data.bio)

    Users.updateOne({ _id: User._id }, { $set: User })

    res.status(200).send()
}



module.exports = {
    AccountGet: AccountGet,
    AccountUpdate: AccountUpdate
}