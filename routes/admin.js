const fetch = require('node-fetch')



async function Dashboard(req, res) {
    
    if (!res.locals.roles.map(role => role.name).includes('Staff')) return res.render('util/maintenance')
    res.render('administration/dashboard')

}



module.exports = {
    Dashboard
}