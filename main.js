//!
//! Modules
//!

const fs = require('fs')

process.env = JSON.parse(fs.readFileSync('config.json', 'utf8'))


//require('./util/paypal').GetAccessToken()
require('./util/loop')()

process.cache.devmode = process.env.devmode



//!
//! MongoDB
//!

const MongoClient = require('mongodb').MongoClient
MongoClient.connect(`mongodb://${process.env.db.host}:${process.env.db.port}`, async function(err, db) {
    if (err) throw err;
    console.log('Connected to the database.')
    process.db = db.db(process.env.db.database)
})



//!
//! Discord Config
//!

const { Client, Intents } = require('discord.js')
var selectedIntents = []
for (intent in Intents.FLAGS) { selectedIntents.push(Intents.FLAGS[intent]) }
const client = new Client({ intents: selectedIntents })
client.login(process.env.api.discord.token)
client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`))
process.client = client



//!
//! Web Config
//!

const express = require('express')
const app = express()
const httpServer = require('http').createServer(app)

Object.defineProperty(app.request, 'ip', {
    configurable: true,
    enumerable: true,
    get: function() { return this.get('X-Forwarded-For', 'CF-Connecting-IP') }
})

const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const io = require('socket.io')(httpServer)
const RateLimit = require('express-rate-limit')

httpServer.listen(process.env.port, () => console.log(`Listening on port ${process.env.port}`))

app.set('trust proxy', 'loopback')
app.set('view engine', 'ejs')

app.use(cookieParser())
app.use(bodyParser.json({ extended: true }))
app.use(fileUpload())

app.use(function(req, res, next) {
    req.io = io
    next()
})

app.use('/storage', express.static(process.env.storage))
app.use('/public', express.static('public'))
app.use('/assets', express.static('assets'))
app.use('/assets_landing', express.static('assets_landing'))



//!
//! Passport
//!

const passport = require('passport')
passport.serializeUser(function(user, done) { done(null, user) })
app.use(passport.initialize())

require('./util/passport').Discord(passport)
require('./util/passport').Steam(passport)



//!
//! Middleware
//!

var Middleware = require('./routes/middleware')

app.use(Middleware.Checks)

//? Limit to 100 requests per minute
app.use(RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100
}))

app.use(Middleware.FetchUser)

app.use('/robots.txt', (req, res) => {
    res.type('text/plain')
    res.send('User-Agent: *\nDisallow: /\nSitemap: /sitemap.xml')
})



//!
//! Routes
//!

//? Authentication
app.route('/login')
    .get(require('./routes/auth').LoginGet)
    .post(require('./routes/auth').LoginPost)

app.route('/register')
    .get(require('./routes/auth').RegisterGet)
    .post(require('./routes/auth').RegisterPost)

app.route('/logout')
    .get(require('./routes/auth').Logout)


//? Account
app.route('/account')
    .get(require('./routes/account').AccountGet)
    .put(require('./routes/account').AccountUpdate)
    .post(require('./routes/upload').Account)


//? Security
app.route('/reset/password')
    .get(require('./routes/security').PasswordResetPage)
    .post(require('./routes/security').InitiatePasswordReset)
    .put(require('./routes/security').ChangePassword)

app.post('/reset/email', require('./routes/security').ChangeEmail)

app.post('/reset/token', require('./routes/security').MassLogout)


//? OAuth2
app.route('/auth/discord')
    .get(passport.authenticate('discord'))
    .delete(require('./routes/auth').UnlinkAuth)
app.get('/auth/discord/callback', passport.authenticate('discord', { failureRedirect: '/login' }), require('./routes/auth').Discord)

app.route('/auth/steam')
    .get(passport.authenticate('steam'))
    .delete(require('./routes/auth').UnlinkAuth)
app.get('/auth/steam/callback', passport.authenticate('steam', { failureRedirect: '/login' }), require('./routes/auth').Steam)


//? Webhooks
app.route('/webhooks/se')
    .post(require('./routes/webhooks').SEpost)
    .get(require('./routes/webhooks').SEget)



//!
//! Pages
//!

//? Landing
app.get('/', (req, res) => res.render('landing'))

//? Space Engineers
app.get('/space-engineers', (req, res) => {
    res.render('pages/space-engineers', { page: req.query.page, topVoters: process.cache.topVoters, serverData: process.cache.serverData })
})

//? Squad
app.get('/squad', (req, res) => {
    res.render('pages/squad', { page: req.query.page })
})



//!
//! Social HUB
//!

//? Dashboard
app.route('/dashboard')
    .get(require('./routes/hub').Dashboard)

//? Members
app.route('/members')
    .get(require('./routes/hub').Members)

//? Members
app.route('/member/*')
    .get(require('./routes/hub').Member)




//!
//! Administration
//!

//? Dashboard
app.route('/admin/dashboard')
    .get(require('./routes/admin').Dashboard)

//? Ticket List
app.route('/admin/tickets')
    .get(require('./routes/admin').TicketList)

//? Ticket Details
app.route('/admin/ticket')
    .get(require('./routes/admin').TicketDetails)




//!
//! PayPal
//!

//app.get('/paypal/return', require('./routes/paypal').Return)
//app.get('/paypal/cancel', require('./routes/paypal').Cancel)



//!
//! Redirects
//!

app.get('/eco', (req, res) => res.redirect('http://horizons.gg:3001'))
app.get('/discord', (req, res) => res.redirect('https://discord.gg/horizons'))
app.get('/donate', (req, res) => res.redirect('https://www.paypal.com/donate/?business=8QMYWSGHR24UJ&no_recurring=0&item_name=Donations&currency_code=AUD'))
app.get('/donate/eu', (req, res) => res.redirect('https://www.paypal.com/donate/?hosted_button_id=JG99GWZ5DLHDJ'))



//!
//! Error Pages
//!

//? 404
app.get('*', (req, res) => {
    res.status(404).render('util/404')
})