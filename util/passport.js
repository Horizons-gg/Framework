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
    }, async function (accessToken, refreshToken, profile, done) { return done(null, profile) }))
}


//? Steam Passport
function Steam(passport) {
    const SteamPassport = require('passport-steam').Strategy

    passport.use(new SteamPassport({
        returnURL: `${process.env.site.root}/auth/steam/callback`,
        realm: process.env.site.root,
        apiKey: process.env.auth.steam.key
    }, async function (identifier, profile, done) { return done(null, profile) }))
}



module.exports = {
    Discord: Discord,
    Steam: Steam
}