async function SEpost(req, res) {
    if (req.query.key !== process.env.security.token) return
    if (!process.cluster) process.cluster = {}
    process.cluster[req.headers.sector] = req.body
}

async function SEget(req, res) {
    if (!process.cluster) process.cluster = {}
    res.send(process.cluster)
}



module.exports = {
    SEpost,
    SEget
}