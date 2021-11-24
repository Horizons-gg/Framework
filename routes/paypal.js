const fetch = require('node-fetch')



async function Return(req, res) {
    console.log(req.query)
}

async function Cancel(req, res) {

}



module.exports = {
    Return,
    Cancel
}