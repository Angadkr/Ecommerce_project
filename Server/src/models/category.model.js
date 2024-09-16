const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name:{
        type:String,
        required:[true,"Category name is required!"],
        unique:true
    },
    createdAt:{
        type:Date,
        //we have access of date.now
        default:Date.now
    }
})

const Category = new mongoose.model("Category",categorySchema)

module.exports = Category