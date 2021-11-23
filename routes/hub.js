async function Dashboard(req, res) {


    res.render('pages/dashboard', { memberCount: 0 })
}



module.exports = {
    Dashboard: Dashboard
}