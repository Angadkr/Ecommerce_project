const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    products:[
        {
            productId:{
                type:Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            cartQuantity:{
                type:Number,
                required:true
            }
        }
    ],
    totalAmount:{
        type:Number,
        required:true
    },
    shippingAddress:{
        type:String,
        required:true
    },
    shippingAddressGoogleMaps:{
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:[true,"Contact Number is required!"],
        validate:{
            validator:function(v){
                return /^(\+\d{1,3})?(\d{7,15})$/.test(v)
            },
            message:props=>`${props.value} is not a valid contact number.`
        }
    },
    status:{
        type:String,
        required:true,
        enum:['Pending','Processing','Shipped','Delivered','Canceled'],
        default:'Pending'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Order = new mongoose.model('Order',orderSchema)

module.exports = Order