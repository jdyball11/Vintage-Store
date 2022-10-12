require('dotenv').config()

const express = require('express')
const ensureLogin = require('connect-ensure-login')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const methodOverride = require('method-override')
const mongoDBSession = require('connect-mongodb-session')

const { notFoundHandler, errorHandler } = require('./middlewares/error-handlers')
const flash = require('express-flash')
const User = require('./models/users')
const Vintage = require('./models/vintage')
const authController = require('./controllers/auth')
const vintageController = require('./controllers/vintage')

const app = express()
const PORT = process.env.PORT
const dbURL = process.env.MONGODB_URL
const MongoDBStore = mongoDBSession(session)
const sessionStore = new MongoDBStore({
  uri: dbURL,
  collection: 'sessions'
})

app.use(express.urlencoded( { extended: true } ))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.get('/', (req, res) => {
    res.render('home.ejs', {
        name: req.user?.username
    })
  })

app.use(authController)
app.use(vintageController)
app.use(errorHandler)
app.use(notFoundHandler)



mongoose.connect(dbURL, () => {
    console.log('connected to vintage db')
})

app.listen(PORT, () => {
    console.log('Listening on port', PORT)
})