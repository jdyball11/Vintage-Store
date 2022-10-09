const express = require('express')
const ensureLogin = require('connect-ensure-login')
const Vintage = require('../models/vintage')
const router = express.Router()
// const upload = require('../middlewares/upload')


//INDEX page - main page
router.get('/vintage', async (req, res) => {

    const vintage = await Vintage.find(req.params.id)
    res.render('index.ejs', {
        vintage: vintage
    })
})

//CREATE route/page - Add new item
router.get('/vintage/createItem', async (req, res) => {
    // const vintage = await Vintage.findById(req.params.id)
    res.render('create.ejs')
})

//DELETE products
router.get('/vintage/deleteItem/:id', (req, res) => {
    
})

//EDIT/UPDATE route/page
router.get('/vintage/:id/edit', (req, res) => {
    res.render('edit.ejs')
})

//EDIT/UPDATE Product
// app.get('/vintage/:id/', (req, res) => {

// })


router.get('/vintage/:id', async (req, res) => {

    const vintage = await Vintage.findById(req.params.id)
    res.render('show.ejs', {
        products: vintage
    })
})




module.exports = router
