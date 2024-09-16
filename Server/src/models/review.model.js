const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewSchema = new mongoose.Schema({
    productId:{
        type:Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Review = new mongoose.model('Review',reviewSchema)

module.exports = Review