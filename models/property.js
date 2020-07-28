const mongoose= require('mongoose');

//Properties schema
const PropertySchema = mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    Price:{
        type: Number,
        required: true
    },
    Location:{
        type: String,
        required: true
    },
    nbedrooms:{
        type: Number,
        required: true
    },
    nbathrooms:{
        type: Number,
        required: true
    },
    landSize:{
        type: Number
    },
    image:{
        type: String,
        required: true
    }
})

const Property = module.exports = mongoose.model('Property',PropertySchema);