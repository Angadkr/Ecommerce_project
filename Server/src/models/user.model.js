const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName:{
        type:String,
        required:[true,"First name is required"]
    },
    lastName:{
        type:String,
        required:[true,"Last name is required"]
    },
    email:{
        type:String,
        //unique is something new
        unique:true,
        lowercase:true,
        required:[true,"Email is required"],
        //validate is required to check if email is in correct format
        validate:{
            //has a validator function
            validator:function(v){
                // inside / / we put the regex(regular expresstion) \s means any non whitespace character and + to consider proceeding as well
                return /\S+@\S+\.\S+/.test(v)
            },
            message:props=>`${props.value} is not a valid email address!`
        }
    },
    password:{
        type:String,
        required:[true,"Password is required!"],
        minLength:[6,"Password should be atleast 6 characters"]
        //above is important
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:"user"
    }
})

//the below pre will be executed before saving of any instance of user model.
userSchema.pre('save',async function(next){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password,salt)
        this.password = hashPassword
        next()
    }catch(error){
        next(error)
    }
})

const User = mongoose.model("User",userSchema)

module.exports = User
