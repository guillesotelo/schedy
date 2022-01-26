const mongoose = require('mongoose')

const scheduleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    schedule: {
        type: Date,
        required: true
    }
})

const Schedules = mongoose.model('Schedules', scheduleSchema)

module.exports = Schedules