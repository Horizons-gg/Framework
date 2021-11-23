process.cache = {}

const fetch = require('node-fetch')


async function Loop() {

    process.cache.topVoters = await fetch(`https://space-engineers.com/api/?object=servers&element=voters&key=${process.env.api.se}&month=current&format=json&limit=10`).then(res => res.json())
    process.cache.serverData = await fetch(`https://space-engineers.com/api/?object=servers&element=detail&key=${process.env.api.se}`).then(res => res.json())

}
setInterval(Loop, 1000 * 30)



module.exports = Loop