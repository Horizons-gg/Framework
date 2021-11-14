const fetch = require('node-fetch')


//? Discord Passport
function Discord(passport) {
    const DiscordStrategy = require('passport-discord').Strategy
    var scopes = ['identify', 'email', 'guilds.join']

    passport.use(new DiscordStrategy({
        clientID: process.env.auth.discord.id,
        clientSecret: process.env.auth.discord.secret,
        callbackURL: 'http://localhost/auth/discord/callback',
        scope: scopes
    },
        async function (accessToken, refreshToken, user, done) {
            var Users = await process.db.collection('users')
            var User = await Users.findOne({ email: user.email })
            if (!User) {
                const fetch = require('node-fetch')
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


//? Steam Passport
function Steam(passport) {

}



module.exports = {
    Discord: Discord,
    Steam: Steam
}