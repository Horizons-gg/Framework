async function Dashboard(req, res) {

    if (!res.locals.roles.map(role => role.name).includes('Staff')) return res.render('util/error', { code: 403, title: "Access Denied", message: 'You do not have permission to view this page.' })
    res.render('administration/dashboard')

}


async function TicketList(req, res) {

    if (!res.locals.roles.map(role => role.name).includes('Staff')) return res.render('util/error', { code: 403, title: "Access Denied", message: 'You do not have permission to view this page.' })

    const Tickets = await process.db.collection('tickets').find({}, { sort: { _id: 1 }, projection: { history: 0 } }).toArray()
    const Open = await process.db.collection('tickets').find({ status: "open" }, { projection: { history: 0 } }).toArray()
    const Closed = await process.db.collection('tickets').find({ status: "archived" || "closed" }, { projection: { history: 0 } }).toArray()

    res.render('administration/tickets/tickets-list', { tickets: Tickets, open: Open, closed: Closed })

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