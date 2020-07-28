const mongoose = require('mongoose');
//user schema
const UserSchema=mongoose.Schema({
    Fname:{
        type: String,
        required: true
    },
    Lname:{
        type: String,
        required: true
    },
    Oname:{
        type: String
    },
    mobile:{
        type: Number,
        required: true
    },
    email:{
        email:true,
        required: true
    },
    password:{
        type: password,
        required: true
    }
})
const User = module.exports=mongoose.model('User', UserSchema);