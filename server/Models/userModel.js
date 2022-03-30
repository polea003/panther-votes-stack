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
    ElectionsVoted: {
        type: Array,

    },
    
   

},
{timestamps: true})

module.exports = mongoose.model('User', userScheme)