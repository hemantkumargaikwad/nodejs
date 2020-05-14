const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 6,
        min: 255
    },
    password: {
        type: String,
        required: true,
        min:8,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user', userSchema)