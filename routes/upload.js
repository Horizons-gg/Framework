const crypto = require('crypto')
const fs = require('fs')


async function Account(req, res) {
    if (!res.locals.user) return res.status(401).send('Unauthorized Access.')
    if (!req.files.file) return res.status(400).send('No file uploaded.')

    var file = req.files.file
    if (file.size > 2000000) return res.status(400).send('File too large, max 2MB')
    if (file.mimetype.includes(['image/png', 'image/jpg', 'image/jpeg'])) return res.status(400).send('File type not supported.')

    var path = `${process.env.storage}/users/${res.locals.user._id}/${req.query.type}`
    var uuid = crypto.randomUUID()

    if (req.query.type === 'avatar') {
        if (!fs.existsSync(path)) await fs.promises.mkdir(path, { recursive: true })
        await fs.promises.readdir(path).then(files => {
            files.forEach(file => fs.promises.unlink(`${path}/${file}`).catch(err => console.log(err)))
        }).catch(err => console.log(err))
        await file.mv(`${path}/${uuid}.${file.mimetype.split('/')[1]}`, (err) => {
            if (err) return res.status(500).send(err)
            res.status(200).send('File uploaded.')
        })
    }
    else if (req.query.type === 'banner') {
        if (!fs.existsSync(path)) await fs.promises.mkdir(path, { recursive: true })
        await fs.promises.readdir(path).then(files => {
            files.forEach(file => fs.promises.unlink(`${path}/${file}`).catch(err => console.log(err)))
        }).catch(err => console.log(err))
        await file.mv(`${path}/${uuid}.${file.mimetype.split('/')[1]}`, (err) => {
            if (err) return res.status(500).send(err)
            res.status(200).send('File uploaded.')
        })
    }
    else return res.status(400).send('Invalid type.')

    var Users = await process.db.collection('users')
    var User = await Users.findOne({ _id: res.locals.user._id })
    User.display[req.query.type] = `/storage/users/${User._id}/${req.query.type}/${uuid}.${file.mimetype.split('/')[1]}`
    await Users.updateOne({ _id: User._id }, { $set: User })
}



module.exports = {
    Account: Account
}