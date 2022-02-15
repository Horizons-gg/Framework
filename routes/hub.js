async function Dashboard(req, res) {


    res.render('pages/dashboard', { memberCount: 0 })
}


async function Members(req, res) {

    var search = req.query.search || null
    var category = req.query.category || 'all'

    category = category.toLowerCase()

    var members = []

    const Users = await process.db.collection('users')

    if (search && category === 'name') members = await Users.find({ 'display.name': { $regex: search, $options: 'i' } }).limit(10).toArray()
    if (search && category === 'discord') members = await Users.find({ 'connections.discord.username': { $regex: search, $options: 'i' } }).limit(10).toArray()
    if (search && category === 'steam') members = await Users.find({ 'connections.steam.displayName': { $regex: search, $options: 'i' } }).limit(10).toArray()
    if (search && category === 'all') {
        for await (user of await Users.find({ 'display.name': { $regex: search, $options: 'i' } }).limit(10).toArray()) members.push(user)
        for await (user of await Users.find({ 'connections.discord.username': { $regex: search, $options: 'i' } }).limit(10).toArray()) members.push(user)
        for await (user of await Users.find({ 'connections.steam.displayName': { $regex: search, $options: 'i' } }).limit(10).toArray()) members.push(user)

        var ids = []
        await members.forEach((user, index) => {
            if (ids.includes(user._id)) members.splice(index, 1)
            else ids.push(user._id)
        })
    }
    if (!search) members = await Users.find({}).limit(12).toArray()

    if (!res.locals.user || !res.locals.user.permissions.administrator) {
        await members.forEach((member, index) => {
            delete member.email
            delete member.security
            delete member.details.location
            delete member.banking
            delete member.connections.discord.email
            members[index] = member
        })
    }


    if (req.headers['sec-fetch-mode'] === 'navigate') return res.render('social/member-list', { members })
    else return res.status(200).send({ members })
}


async function Member(req, res) {

    var member = await process.db.collection('users').findOne({ _id: req.params['0'] })
    if (!member) member = await process.db.collection('users').findOne({ "display.profileurl": req.params['0'].toLowerCase() })
    if (!member) return res.render('util/404')

    if (member.details.dob) {
        var today = new Date()
        var birthDate = new Date(member.details.dob)
        var age = today.getFullYear() - birthDate.getFullYear()
        var m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        member.details.age = age
    }


    var avatar = member.display.avatar || 'none'
    if (avatar === 'none') output = "/assets/images/avatar.jpg"
    else if (avatar.includes('/storage/users')) output = member.display.avatar
    else if (avatar === 'discord' && member.connections.discord.avatar) output = `https://cdn.discordapp.com/avatars/${member.connections.discord.id}/${member.connections.discord.avatar}.webp?size=128`
    else if (avatar === 'steam') output = member.connections.steam._json.avatarfull
    else output = "/assets/images/avatar.jpg"
    member.display.avatar = output

    var banner = member.display.banner || 'none'
    if (banner === 'none') output = "/assets/images/banner.jpg"
    else if (banner.includes('/storage/users')) output = member.display.banner
    else if (banner === 'discord' && member.connections.discord.banner) output = `https://cdn.discordapp.com/banners/${member.connections.discord.id}/${member.connections.discord.banner}.webp?size=300`
    else output = "/assets/images/banner.jpg"
    member.display.banner = output

    res.render('social/member', { member: member })
}



module.exports = {
    Dashboard,
    Members,
    Member
}