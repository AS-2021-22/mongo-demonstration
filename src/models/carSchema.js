const mongoose = require('mongoose')
 
const carSchema = mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    }
})
 
const Car = mongoose.model('Car', carSchema)
 
module.exports = Car