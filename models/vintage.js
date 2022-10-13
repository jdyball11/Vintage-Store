
const mongoose = require('mongoose')

const vintageSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, require: true },
    username: { type: String, required: true },
    title: {type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    style: { type: String },
    stock: { type: Number, min: 0},
    brand: { type: String },
    era: { type: String },
    watching: [ {type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    imageURL: String
    
})

const Vintage = mongoose.model('Vintage', vintageSchema)

module.exports = Vintage