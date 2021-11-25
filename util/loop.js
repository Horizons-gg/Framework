process.cache = {}

const fetch = require('node-fetch')
const fs = require('fs')


async function Loop() {

    //? Site Access
    var config = await fs.promises.readFile('./config.json', 'utf-8').catch(err => console.log(err))
    config = JSON.parse(config)
    process.cache.devmode = config.devmode


    //? Space Engineers
    process.cache.topVoters = await fetch(`https://space-engineers.com/api/?object=servers&element=voters&key=${process.env.api.se}&month=current&format=json&limit=10`).then(res => res.json()).catch(err => console.log(err))
    if (!process.cache.topVoters) process.cache.topVoters = { voters: [] }

    process.cache.serverData = await fetch(`https://space-engineers.com/api/?object=servers&element=detail&key=${process.env.api.se}`).then(res => res.json()).catch(err => console.log(err))
    if (!process.cache.serverData) process.cache.serverData = { rank: '0' }

}
setInterval(Loop, 1000 * 30)



module.exports = Loop