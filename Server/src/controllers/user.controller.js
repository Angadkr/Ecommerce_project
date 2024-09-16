const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signupController = async(req,res)=>{
    try{
        const {firstName,lastName,email,password} = req.body
        
        if(!firstName || !lastName || !email || !password){
            return res.status(500).json({message:"All fields are required!"})
        }

        const existinuser = await User.findOne({email})
        if(existinuser){
            return res.status(400).json({message:"Email already exists!"})
        }

        const newUser = new User({firstName,lastName,email,password})

        await newUser.save()

        res.status(201).json({message:"User created successfully"})
    }catch(e){
        res.status(400).json({message:e.message})
    }
}

const signinController = async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})

        if(!user){
            res.status(404).json({message:"User does not exist!"})
        }

        const isValidPassword = await bcrypt.compare(password,user.password)

        if(!isValidPassword){
            res.status(401).json({message:"Invalid password!"})
        }

        //generate jwt token if authenticated for session management

        const token = jwt.sign({id:user._id},"jwtsecret",{
            expiresIn:"10d"
        })

        res.status(200).json({user,token})

    }catch(e){
        res.status(400).json({message:e.message})
    }
}

const getUserProfile = async(req,res)=>{
    try{
        const userId = req.query.id
        const user = await User.findById(userId)
        if(!user){
            res.status(404).json({message:"user does not exist!"})
        }

        //for security pupose:
        user.password = undefined
        res.status(200).json(user)
    }catch(e){
        res.send(400).json({message:e.message})
    }
}


module.exports= {
    signupController,
    signinController,
    getUserProfile
}