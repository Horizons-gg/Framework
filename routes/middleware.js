const fetch = require('node-fetch')



function Data(req, res, next) {
    res.locals.api = process.env.api

    next()
}

async function FetchUser(req, res, next) {

    if (req.cookies.token) {
        var response = await fetch(`${process.env.api}/user?token=${req.cookies.token}`)
        if (response.status === 200) res.locals.user = await response.json()
        else res.locals.user = null
    }

    next()
}



module.exports = {
    Data: Data,
    FetchUser: FetchUser
}