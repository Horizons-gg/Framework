const crypto = require('crypto')

function XSSFilter(data) {
    if (!data) return false
    if (typeof data === 'string') return data.replace(/[<>]/g, '')
    if (typeof data === 'object') {
        for (key in data) {
            if (typeof data[key] === 'string') {
                data[key] = data[key].replace(/[<>]/g, '')
            }
        }
        return data
    }
    if (Array.isArray(data)) {
        data.forEach((item, index) => {
            if (isStringObject(item)) {
                data[index] = item.replace(/[<>]/g, '')
            }
        })
        return data
    }
    else return false
}

async function GenerateToken(length) {
    var Users = await process.db.collection('users')
    var token
    while (!token) {
        var temp = crypto.randomBytes(length || 48).toString('base64url')
        if (!await Users.findOne({ "security.token": temp })) token = temp
    }
    return token
}



module.exports = {
    XSSFilter: XSSFilter,
    GenerateToken: GenerateToken
}