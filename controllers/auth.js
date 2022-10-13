const express = require('express')
const passport = require('passport')
const User = require('../models/users')
const router = express.Router()

//Register route/page
router.get('/register', (req, res) => {
  res.render('register.ejs', {
    name: req.user?.username
  })
})

//POST to store new user data
router.post('/register', async (req, res) => {
  const { username, password } = req.body
  try {
  const user = await User.register(
    new User({ username: username }),
    password
  )
  req.login(user, () => {
    res.redirect('/vintage')
  })
} catch (error) {
    req.flash('success', error.message)
    res.redirect('/register')
}
})


router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/vintage',
    failureFlash: true
  }))

router.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/vintage')
    } else {
        res.render('login.ejs', {
            name: req.user?.username
          })
    }
})

//when any user logs out they will redirected to the index/main page
router.post('/logout', (req, res) => {
    req.logout(() => {
      res.redirect('/')
    })
  })
  

module.exports = router
