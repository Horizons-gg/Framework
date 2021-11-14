const fetch = require('node-fetch')
const fs = require('fs')



function Data(req, res, next) {
    res.locals.api = process.env.api

    next()
}

async function FetchUser(req, res, next) {

    //? User
    if (req.cookies.token) {
        var response = await fetch(`${process.env.api}/user?token=${req.cookies.token}`)
        if (response.status === 200) res.locals.user = await response.json()
        else res.locals.user = null
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
        else if (banner === 'discord') output = `https://cdn.discordapp.com/banners/${res.locals.user.connections.discord.id}/${res.locals.user.connections.discord.banner}.png?size=300`
        else output = "/assets/images/banner.jpg"
    } else output = "/assets/images/banner.jpg"
    res.locals.banner = output
    
    next()
}



module.exports = {
    Data: Data,
    FetchUser: FetchUser
}