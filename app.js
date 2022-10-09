
const express = require('express')
const ensureLogin = require('connect-ensure-login')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const methodOverride = require('method-override')
const mongoDBSession = require('connect-mongodb-session')

const User = require('./models/users')
const Vintage = require('./models/vintage')
const authController = require('./controllers/auth')
const vintageController = require('./controllers/vintage')

const app = express()
const PORT = 3000
const dbURL = "mongodb://localhost:27017/vintage"
const MongoDBStore = mongoDBSession(session)
const sessionStore = new MongoDBStore({
  uri: dbURL,
  collection: 'sessions'
})

app.use(express.urlencoded( { extended: true } ))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(authController)
app.use(vintageController)

//     const newProducts = {
//         name: 'Nick',
//         title: 'Addidas Jacket',
//         price: 70,
//         description: 'Addidas Jacket from the 70s',
//         watching: 0,
//         style: 'Jacket',
//         brand: 'Addidas',
//         era: '1970s',
//     }

  
// Vintage.create(newProducts)
//   .then((doc) => {
//     // doc is the document that was created
//     console.log(doc)
//   })
//   .catch((err) => {
//     console.log(err)
//   })



app.get('/', (req, res) => {
    res.render('home.ejs')
  })


mongoose.connect(dbURL, () => {
    console.log('connected to vintage db')
})

app.listen(PORT, () => {
    console.log('Listening on port', PORT)
})