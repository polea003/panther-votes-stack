const mongoose = require('mongoose')

const userScheme = mongoose.Schema({
    name: {
        type:String,
        required: [true, 'Please add a name'],
    },
    email: {
        type:String,
        required: [true, 'Please add a Email'],
        unique: true
    },
    password: {
        type:String,
        required: [true, 'Please add a Password'],
    },
    
   

},
{timestamps: true})

module.exports = mongoose.model('User', userScheme)