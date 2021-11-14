const fetch = require('node-fetch')


//? Discord Passport
function Discord(passport) {
    const DiscordStrategy = require('passport-discord').Strategy
    var scopes = ['identify', 'email', 'guilds.join']

    passport.use(new DiscordStrategy({
        clientID: process.env.auth.discord.id,
        clientSecret: process.env.auth.discord.secret,
        callbackURL: `${process.env.site.root}/auth/discord/callback`,
        scope: scopes
    },
        async function (accessToken, refreshToken, profile, done) {
            return done(null, profile)
            
            // var Users = await process.db.collection('users')
            // var User = await Users.findOne({ "connections.discord.id": profile.id })
            // if (!User) {
            //     fetch(`${process.env.api}/user/create?token=${process.env.security.token}`, {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify({
            //             name: profile.username,
            //             email: profile.email,
            //             password: null,
            //             avatar: 'discord',
            //             banner: 'discord',
            //             discord: profile
            //         })
            //     })
            //         .then(async response => {
            //             if (response.status !== 201) return done(new Error(await response.text()))
            //             done(null, await response.json())
            //         })
            //         .catch(err => done(new Error(err)))
            // } else {
            //     User.connections.discord = profile
            //     await Users.updateOne({ email: profile.email }, { $set: User })
            //     return done(null, User)
            // }
        }))
}


//? Steam Passport
function Steam(passport) {
    return
    const SteamPassport = require('passport-discord').Strategy

    passport.use(new SteamPassport({
        returnURL: `${process.env.site.root}/auth/steam/callback`,
        realm: process.env.site.root,
        apiKey: process.env.auth.steam.key
    },
        async function (identifier, profile, done) {
            var Users = await process.db.collection('users')
            var User = await Users.findOne({ email: user.email })
            if (!User) {
                fetch(`${process.env.api}/user/create?token=${process.env.security.token}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: user.username,
                        email: user.email,
                        password: null,
                        avatar: 'discord',
                        banner: 'discord',
                        discord: user
                    })
                })
                    .then(async response => {
                        if (response.status !== 201) return done(new Error(await response.text()))
                        done(null, await response.json())
                    })
                    .catch(err => done(new Error(err)))
            } else {
                User.connections.discord = user
                await Users.updateOne({ email: user.email }, { $set: User })
                return done(null, User)
            }
        }))
}



module.exports = {
    Discord: Discord,
    Steam: Steam
}