const express = require('express')
const ensureLogin = require('connect-ensure-login')
const Vintage = require('../models/vintage')
const users = require('../models/users')
const router = express.Router()
const upload = require('../middlewares/upload')
const flash = require('express-flash')


//INDEX page - main page
router.get('/vintage', async (req, res) => {
    console.log(req.user)
    const vintage = await Vintage.find()
    res.render('index.ejs', {
        vintage: vintage,
        name: req.user?.username
    })
})

router.use(ensureLogin.ensureLoggedIn())

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
    req.body.imageURL = req.file.path
    const object = {
        ...req.body,
        user_id: req.user._id,
        username: req.user.username
    } 
    try {
        await Vintage.create(object)
        req.flash('success', 'Item successfully added to collection')
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
    if (req.file) {
    req.body.imageURL = req.file.path
    } else {
    const vintage = await Vintage.findById(req.params.id)
    res.render('edit.ejs', {
        vintage: vintage,
        name: req.user
    })
}
})


//DELETE products
router.delete('/vintage/myCollection/:id', async (req, res) => {
    try {
        await Vintage.findByIdAndDelete(req.params.id)
        req.flash('success', 'Item Successfully deleted')
        res.redirect('/vintage/myCollection')
    } catch (error) {
        console.log('didnt delete', error)
    }
})

//EDIT route
router.put('/vintage/edit/:id', upload.single('image'), async (req, res) => {
    console.log(req.file)
    req.body.imageURL = req.file?.path
    try {
        await Vintage.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
            )
        req.flash('success', 'Item successfully updated')    
        res.redirect('/vintage/myCollection')
    } catch (error) {
        console.log('failed to edit', error)
    }
})


//SHOW page
router.get('/vintage/:id', async (req, res) => {
    try {
    const vintage = await Vintage.findById(req.params.id)
    if (vintage) {
        res.render('show.ejs', {
            products: vintage,
            name: req.user
        })
    } else {
        throw new Error('Vintage Page Not Found')
    }
    
} catch (error) {
    next(error)
}
})




module.exports = router
