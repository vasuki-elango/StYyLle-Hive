const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name:String,
    description:String,
    category:String,
    subCategory:String,
    bestseller:Boolean,
    price:String,
    sizes: [String],
    image: [{}],
    stock:Number
})

module.exports = mongoose.model('products',ProductSchema)