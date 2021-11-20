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

function Hash(string) {
    return crypto.createHash('sha256').update(process.env.security.seed + string).digest('hex')
}

function Verify(string, hash) {
    var ReceivedPassword = Hash(string)
    if (ReceivedPassword == hash) return true
    else return false
}

function CheckPasswordRequirements(password) {
    if (password.length < 8) return false
    if (password.search(/[a-z]/) === -1) return false
    if (password.search(/[A-Z]/) === -1) return false
    if (password.search(/[0-9]/) === -1) return false
    if (password.search(/[^a-zA-Z0-9]/) === -1) return false
    return true
}

function Encrypt(string) {
    var encrypted = crypto.publicEncrypt(process.env.security.publicKey, Buffer.from(string))
    return encodeURI(encrypted.toString("base64url"))
}

function Decrypt(string) {
    var key = process.env.security.privateKey
    var passphrase = process.env.security.token
    try {
        var decrypted = crypto.privateDecrypt({ key, passphrase }, Buffer.from(string, "base64url"))
        return decrypted.toString("utf8")
    } catch {
        return "Failed to Decrypt"
    }
}

async function GenerateKeyPair() {
    crypto.generateKeyPair('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            passphrase: process.env.security.token,
            cipher: "aes-256-cbc"
        }
    }, (err, publicKey, privateKey) => {
        if (err) throw err
        process.env.security.publicKey = publicKey
        process.env.security.privateKey = privateKey
        fs.writeFileSync('config.json', JSON.stringify(process.env, null, '\t'))
        process.exit(0)
    })
}



module.exports = {
    XSSFilter: XSSFilter,
    GenerateToken: GenerateToken,
    Hash: Hash,
    Verify: Verify,
    CheckPasswordRequirements: CheckPasswordRequirements,
    Encrypt: Encrypt,
    Decrypt: Decrypt,
    GenerateKeyPair: GenerateKeyPair
}