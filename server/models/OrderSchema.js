const mongoose = require('mongoose')

const OrderSchma = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    items:[
        {
            productId:{
                type :mongoose.Schema.Types.Mixed,
                ref:'products'
            },
            name:String,
            quantity:Number,
            price:Number
        }
    ],
    totalAmount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
        default:'Confirmed'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    paymentMethod:{
        type:String,
        default:"Cash on Delivery",
        enum:['Stripe','Cash on Delivery','Paypal']
    }
})

module.exports=mongoose.model('orders',OrderSchma)