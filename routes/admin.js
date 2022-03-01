const fetch = require('node-fetch')



async function Dashboard(req, res) {

    if (!res.locals.roles.map(role => role.name).includes('Staff')) return res.render('util/error', { code: 403, title: "Access Denied", message: 'You do not have permission to view this page.' })
    res.render('administration/dashboard')

}


async function TicketList(req, res) {

    if (!res.locals.roles.map(role => role.name).includes('Staff')) return res.render('util/error', { code: 403, title: "Access Denied", message: 'You do not have permission to view this page.' })
    res.render('administration/tickets/tickets-list')

}


async function TicketDetails(req, res) {

    if (!res.locals.roles.map(role => role.name).includes('Staff')) return res.render('util/error', { code: 403, title: "Access Denied", message: 'You do not have permission to view this page.' })
    res.render('administration/tickets/tickets-details')

}



module.exports = {
    Dashboard,
    TicketList,
    TicketDetails
}