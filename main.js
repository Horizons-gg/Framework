//!
//! Modules
//!

const fs = require('fs')
const util = require('util')

process.env = JSON.parse(fs.readFileSync('config.json', 'utf8'))

//? Initialize Logger
var Today = new Date()
if (!fs.existsSync('./Logs')) fs.mkdirSync('./Logs')
var logFile = fs.createWriteStream(`./Logs/${Today.getFullYear()}-${Today.getMonth()}-${Today.getDay()}.log`, { flags: 'a' })
// Or 'w' to truncate the file every time the process starts.
var logStdout = process.stdout

console.log = function () {
    logFile.write(`${util.format.apply(null, arguments)}\n`)
    logStdout.write(`${util.format.apply(null, arguments)}\n`)
}
console.error = console.log

console.log(`\n\n----- NEW PROCESS STARTED @ ${Today} -----\n`)



//!
//! MongoDB
//!

const MongoClient = require('mongodb').MongoClient
MongoClient.connect(`mongodb://${process.env.db.host}:${process.env.db.port}`, function (err, db) {
    if (err) throw err;
    console.log('Connected to the database.')
    process.db = db.db(process.env.db.database)
})



//!
//! Discord Config
//!

// const { Client, Intents } = require('discord.js')
// var selectedIntents = []
// for (intent in Intents.FLAGS) { selectedIntents.push(Intents.FLAGS[intent]) }
// const client = new Client({ intents: selectedIntents })
// client.login(process.env.discord.token)

// process.client = client



//!
//! Web Config
//!

const express = require('express')
const app = express()
const httpServer = require('http').createServer(app)

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const io = require('socket.io')(httpServer)

httpServer.listen(process.env.port, () => console.log(`Listening on port ${process.env.port}`))

app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(bodyParser.json({ extended: true }))

app.use(function (req, res, next) {
    req.io = io
    next()
})

app.use('/public', express.static('public'))
app.use('/assets', express.static('assets'))
app.use('/assets_landing', express.static('assets_landing'))



//!
//! Passport
//!

// const passport = require('passport')
// passport.serializeUser(function (user, done) { done(null, user) })
// passport.deserializeUser(function (obj, done) { done(null, obj) })
// app.use(passport.initialize())
// app.use(passport.session())



//!
//! Middleware
//!

var Middleware = require('./routes/middleware')

app.use(Middleware.Data)
app.use(Middleware.FetchUser) // Fetch User Data from API



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


//? Account
app.route('/account')
    .get(require('./routes/account').AccountGet)
    .put(require('./routes/account').AccountUpdate)