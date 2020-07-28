const mongoose=require('mongoose');

//admin schema
const AdminSchema = mongoose.Schema({
    Fname:{
        type: String
    },
    Lname:{
        type: String
    },
    Oname:{
        type: String
    },
    mobile:{
        type: Number
    },
    email:{
        type: Email
    },
    password:{
        type: String
    },
    PIN:{
        type: Number
    }
})
const Admin = module.exports=mongoose.model('Admin', UserSchema);