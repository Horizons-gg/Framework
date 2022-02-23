const Client = process.client


function GetRoles(id, type) {
    return new Promise (async (resolve, reject) => {

        if (!id) return reject('No ID Presented')

        var Guild = Client.guilds.cache.get(process.env.api.discord.guild)
        if (!Guild) Guild = await Client.guilds.fetch(process.env.api.discord.guild).catch(err => null)
        if (!Guild) return reject(new Error('Guild not found!'))

        var Member = Guild.members.cache.get(id)
        if (!Member) Member = await Guild.members.fetch(id).catch(err => null)
        if (!Member) return reject(new Error('Member not found!'))

        const Roles = Member.roles.cache.map(role => {
            if (type) return role[type]
            else return role
        })
        return resolve(Roles)
    })
}




module.exports = {
    
    GetRoles

}