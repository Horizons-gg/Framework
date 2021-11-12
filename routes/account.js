const fetch = require('node-fetch')



function AccountGet(req, res) {
    if (!res.locals.user) return res.redirect('/login')
    res.render('account/account')
}



module.exports = {
    AccountGet: AccountGet
}