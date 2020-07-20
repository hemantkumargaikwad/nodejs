const mongoose = require('mongoose')
const { string } = require('@hapi/joi')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    lastName: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    mobile: {
        type: String,
        required: true,
        min: 10,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 6,
        min: 255
    },
    birthDate:{
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user', userSchema)