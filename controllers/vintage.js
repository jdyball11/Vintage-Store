const express = require('express')
const ensureLogin = require('connect-ensure-login')
const Vintage = require('../models/vintage')
const users = require('../models/users')
const router = express.Router()
const upload = require('../middlewares/upload')
const flash = require('express-flash')
const User = require('../models/users')
const { isObjectIdOrHexString, default: mongoose } = require('mongoose')


//INDEX page - main page
router.get('/vintage', async (req, res) => {
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

router.get('/vintage/myCollection/watch', async (req, res) => {
    const vintage = await Vintage.find()
    res.render('watch.ejs', {
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
        req.flash('error', 'Item was not uploaded')
        res.redirect('vintage/myCollection/create')
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
        req.flash('error', 'Item was not updated')    
        res.redirect('/vintage/myCollection')
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
        req.flash('error', 'Item successfully updated')    
        res.redirect('/vintage/myCollection')
    }
})

//Watching route
router.put('/vintage/:id/watching', async (req, res) => {
    try {
        await Vintage.findByIdAndUpdate(
            req.params.id,
             {
            $push: { 'watching': mongoose.Types.ObjectId(req.user._id) }
        })
        res.redirect('/vintage')
    } catch (error) {
        req.flash('error', error)    
        res.redirect('/vintage/myCollection')
    }
})

//PUT Buy
router.put('/vintage/:id/buy', async (req, res) => {
    console.log(req.params.id)
    try {
        await Vintage.findByIdAndUpdate(
            req.params.id,
             {
            $inc: { stock: -1 }
        })
        res.redirect('/vintage')
    } catch (error) {
        console.log('no update', error)
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
