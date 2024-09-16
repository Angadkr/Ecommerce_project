const express = require('express')
const cors = require('cors')
const env = require('dotenv')
const mongoose = require('mongoose')
const cloudinary = require('cloudinary')
const app = express()

const userRoutes = require('./src/routes/user.route')
const categoryRoutes = require('./src/routes/category.route')
const productRoutes = require('./src/routes/product.route')
const reviewRoutes = require('./src/routes/review.route')
const cartRoutes = require('./src/routes/cart.route')
const orderRoutes = require('./src/routes/order.route')
const path = require('path')


env.config();
//so that we can use environment variables 


mongoose.connect(process.env.db)
    .then(()=>{
        console.log("DataBase Connected!")
    }).catch((e)=>{
        console.log(e)
    })


cloudinary.config({
    cloud_name:`${process.env.CLOUD_NAME}`,
    api_key:`${process.env.API_KEY}`,
    api_secret:`${process.env.API_SECRET}`
})

app.use('/healthCheck',(req,res)=>{
    res.send("Ok")
})
app.use(cors())
app.use(express.json())
//express.json is a middleware that is used to parse json files

app.use(`/api`,userRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',reviewRoutes)
app.use('/api',cartRoutes)
app.use('/api',orderRoutes)

// app.use(express.static(path.join(__dirname,"/client/.next")))

app.listen(process.env.PORT,(req,res)=>{
    console.log(`listening on port ${process.env.PORT}!`)
})