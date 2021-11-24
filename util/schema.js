const crypto = require('crypto')


async function User() {

    var UUID = null
    while (!UUID) {
        tempUUID = crypto.randomUUID()
        if (!await process.db.collection('users').findOne({ _id: tempUUID })) UUID = tempUUID
    }

    return {
        _id: UUID,
        email: null,
        created: new Date(),
        welcome: true,
        display: {
            name: "",
            avatar: 'none',
            banner: 'none',
            color: '#ffffff',
            theme: 'dark'
        },
        security: {
            password: null,
            token: await require('../util/security').GenerateToken(),
            lastLoginAddress: null
        },
        permissions: {
            administrator: false
        },
        details: {
            firstName: "",
            lastName: "",
            dob: "",
            pronouns: "None",
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
        banking: {
            paypal: {
                
            }
        },
        connections: {
            discord: {},
            steam: {},
            google: {},
            microsoft: {},
            github: {},
            patreon: {}
        }
    }
}



module.exports = {
    User: User
}