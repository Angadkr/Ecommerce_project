const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:'true'
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:'true'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    cartQuantity:{
        type:Number,
        required:true,
        default:1
    }
})

const Cart = new mongoose.model('Cart',cartSchema)

module.exports = Cart