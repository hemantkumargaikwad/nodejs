const mongoose = require('mongoose')

const appointmentsSchema = mongoose.Schema({
    usedId: {
        type: String,
        required: true
    },
    appointmentFor: {
        type: String,
        max: 6,
        min: 255
    },
    preferredTime: {
        type: String
    },
    status: {
        type: String,
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

module.exports = mongoose.model('appointments', appointmentsSchema)