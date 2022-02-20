const fetch = require('node-fetch')



async function Dashboard(req, res) {
    
    res.render('administration/dashboard')

}



module.exports = {
    Dashboard
}