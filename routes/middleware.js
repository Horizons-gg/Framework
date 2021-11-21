const fetch = require('node-fetch')
const fs = require('fs')



function Data(req, res, next) {
    res.locals.api = process.env.api

    next()
}

async function FetchUser(req, res, next) {

    //? User
    if (req.cookies.token) {
        res.locals.user = await process.db.collection('users').findOne({ "security.token": req.cookies.token })
    }


    //? Avatar
    if (res.locals.user) {
        var output
        var avatar = res.locals.user.display.avatar || 'none'

        if (avatar === 'none') output = "/assets/images/avatar.jpg"
        else if (avatar.includes('/storage/users')) {
            if (fs.existsSync(process.env.storage.replace('/storage', '') + res.locals.user.display.avatar)) output = res.locals.user.display.avatar
            else output = "/assets/images/avatar.jpg"
        }
        else if (avatar === 'discord') output = `https://cdn.discordapp.com/avatars/${res.locals.user.connections.discord.id}/${res.locals.user.connections.discord.avatar}.webp?size=128`
        else if (avatar === 'steam') output = res.locals.user.connections.steam._json.avatarfull
        else output = "/assets/images/avatar.jpg"
    } else output = "/assets/images/avatar.jpg"
    res.locals.avatar = output


    //? Banner
    if (res.locals.user) {
        var output
        var banner = res.locals.user.display.banner || 'none'

        if (banner === 'none') output = "/assets/images/banner.jpg"
        else if (banner.includes('/storage/users')) {
            if (fs.existsSync(process.env.storage.replace('/storage', '') + res.locals.user.display.banner)) output = res.locals.user.display.banner
            else output = "/assets/images/banner.jpg"
        }
        else if (banner === 'discord') output = `https://cdn.discordapp.com/banners/${res.locals.user.connections.discord.id}/${res.locals.user.connections.discord.banner}.webp?size=300`
        else output = "/assets/images/banner.jpg"
    } else output = "/assets/images/banner.jpg"
    res.locals.banner = output

    next()
}



module.exports = {
    Data: Data,
    FetchUser: FetchUser
}