const mongoose = require('mongoose');

//page Schema
const PageSchema=mongoose.Schema({

title:{
    type: String,
    required: true
},
slug:{
    type: String
    
},
content:{
    type: String,
    
},
sorting:{
    type: Number
    
}

});


const Page = module.exports=mongoose.model('Page', PageSchema);