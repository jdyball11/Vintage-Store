const express = require('express')
const ensureLogin = require('connect-ensure-login')
const Vintage = require('../models/vintage')
const users = require('../models/users')
const router = express.Router()
const upload = require('../middlewares/upload')


//INDEX page - main page
router.get('/vintage', async (req, res) => {
    console.log(req.user)
    const vintage = await Vintage.find()
    res.render('index.ejs', {
        vintage: vintage,
        name: req.user?.username
    })
})


//MyCollection route page
router.get('/vintage/myCollection', async (req, res) => {
    const vintage = await Vintage.find()
    res.render('mycollection.ejs', {
        vintage: vintage,
        name: req.user,
    })
})


//CREATE route/page - Add new item
router.post('/vintage', upload.single('image'), async (req, res) => {
    console.log(req.file)
    req.body.imageURL = req.file.path
    try {
        await Vintage.create(req.body)
        res.redirect('vintage/myCollection')
    } catch (error) {
        console.log(error)
    }
})


//CREATE ROUTE
router.get('/vintage/myCollection/create', (req, res) => {
    res.render('create.ejs', {
        name: req.user
    })
})


// EDIT/UPDATE Product PAGE
router.get('/vintage/myCollection/edit/:id', async (req, res) => {
    const vintage = await Vintage.findById(req.params.id)
    res.render('edit.ejs', {
        vintage: vintage,
        name: req.user
    })
})


//DELETE products
router.delete('/vintage/myCollection/:id', async (req, res) => {
    try {
        await Vintage.findByIdAndDelete(req.params.id)
        res.redirect('/vintage/myCollection')
    } catch (error) {
        console.log('didnt delete', error)
    }
})

//EDIT route
router.put('/vintage/edit/:id', async (req, res) => {
    console.log(req.params.id)
    try {
        await Vintage.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
            )
        res.redirect('/vintage/myCollection')
    } catch (error) {
        console.log('failed to edit', error)
    }
})


//SHOW page
router.get('/vintage/:id', async (req, res) => {
    const vintage = await Vintage.findById(req.params.id)
    res.render('show.ejs', {
        products: vintage,
        name: req.user
    })
})




module.exports = router
