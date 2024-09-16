const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    //below is slug that is used in seo(search engine optimization) as spaces ,@ ,_ etc cause quite a problem in url
    slug:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    imageUrl:{
        type:String
    },
    reviews:{
        type:Schema.Types.ObjectId,
        ref:'Review'
    },
    quantity:{
        type:Number,
        required:true
    }
})

const Product = new mongoose.model('Product',productSchema)

module.exports = Product