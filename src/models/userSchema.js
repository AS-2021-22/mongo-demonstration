const mongoose = require('mongoose')
 
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    CF: {
        type: String,
        required: true
    },
    registration_date:{
        type: Date,
        default: Date.now
    },
    car_owned:{
        type:Array,
        default: []
    }
})
 
const User = mongoose.model('User', userSchema)
 
module.exports = User