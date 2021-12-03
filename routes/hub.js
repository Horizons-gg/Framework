async function Dashboard(req, res) {


    res.render('pages/dashboard', { memberCount: 0 })
}


async function Members(req, res) {

    var search = req.query.search || null
    var category = req.query.category || 'all'

    var members = []

    const Users = await process.db.collection('users')

    if (search && category === 'name') members = await Users.find({ 'display.name': { $regex: search } }).limit(10).toArray()
    if (search && category === 'discord') members = await Users.find({ 'connections.discord.username': { $regex: search } }).limit(10).toArray()
    if (search && category === 'steam') members = await Users.find({ 'connections.steam.displayName': { $regex: search } }).limit(10).toArray()
    if (search && category === 'all') {
        for await (user of await Users.find({ 'display.name': { $regex: search } }).limit(10).toArray()) members.push(user)
        for await (user of await Users.find({ 'connections.discord.username': { $regex: search } }).limit(10).toArray()) members.push(user)
        for await (user of await Users.find({ 'connections.steam.displayName': { $regex: search } }).limit(10).toArray()) members.push(user)

        var ids = []
        await members.forEach((user, index) => {
            if (ids.includes(user._id)) members.splice(index, 1)
            else ids.push(user._id)
        })
    }
    if (!search) members = await Users.find({}).limit(10).toArray()

    if (!res.locals.user.permissions.administrator) {
        await members.forEach((member, index) => {
            delete member.email
            delete member.security
            delete member.details.firstName
            delete member.details.lastName
            delete member.details.location
            delete member.banking
            delete member.connections.discord.email
            members[index] = member
        })
    }


    if (req.headers['sec-fetch-mode'] === 'navigate') return res.render('pages/member-list', { members })
    else return res.status(200).send({ members })
}



module.exports = {
    Dashboard,
    Members
}