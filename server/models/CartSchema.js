const mongoose = require('mongoose')
const { schema } = require('./ProductSchema')

const CartItemSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.Mixed,
        ref:'products'
    },
    quantity:{
        type:Number,
        default:1
    }
})

const CartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        unique:true
    },
    items:{
        type:[CartItemSchema],
        default:[]
    }
})

module.exports = mongoose.model('cart',CartSchema)