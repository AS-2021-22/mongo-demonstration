const mongoose = require('mongoose')
 
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cognome: {
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
    }
})
 
const User = mongoose.model('User', userSchema)
 
module.exports = User