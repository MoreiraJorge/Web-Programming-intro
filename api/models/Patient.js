const mongoose = require('mongoose')

const PatientSchema = new mongoose.Schema({

    name: String,
    address: String,
    email: String,
    password: String,
    age: Number,
    phoneNumber: Number,
    idCard: String,
    isTestDone: Boolean,
    updated_at: { type: Date, default: Date.now },

})

module.exports = mongoose.model('Patient', PatientSchema)