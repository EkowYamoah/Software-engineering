const mongoose = require('mongoose');
const User = require('../models/user');
const Admin = require('../models/admin');


const SignSchema = mongoose.Schema({
    email:{
        User.UserSchema.email,
        required: true
    },
    password:{
        User.UserSchema.password,
        required: true
    }
})

const SignIn = module.exports = mongoose.model('SignIn',SignSchema);