const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name: String,
    address: String,
    age: Number,
    id: Number,
    password: String,
    phoneNumber: Number,
    idCard: String,
    role: String,
    schedule: Date, 
    updated_at: { type: Date, default: Date.now },

})

module.exports = mongoose.model('User', UserSchema)