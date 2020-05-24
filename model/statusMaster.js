const mongoose = require('mongoose')

const statusMasterSchema = mongoose.Schema({
    statusType: {
        type: String
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

module.exports = mongoose.model('statusMaster', statusMasterSchema)