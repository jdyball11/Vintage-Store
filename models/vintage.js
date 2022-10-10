
const mongoose = require('mongoose')

const vintageSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, require: true },
    name: { type: String, required: true },
    title: {type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    watching: { type: Number, default: 0 },
    style: { type: String },
    brand: { type: String },
    era: { type: String },
    imageURL: String
    
})

const Vintage = mongoose.model('Vintage', vintageSchema)

module.exports = Vintage