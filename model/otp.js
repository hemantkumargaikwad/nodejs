const mongoose = require('mongoose')

const otpSchema = mongoose.Schema({
    mobile: {
        type: String,
        required: true,
        min: 10,
        max: 255
    },
    otp: {
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

module.exports = mongoose.model('otp', otpSchema)