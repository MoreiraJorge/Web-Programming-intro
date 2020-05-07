const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var Covtest = require('../models/Covtest')

const UserSchema = Schema({

    //_id: Schema.Types.ObjectId,
    name: String,
    address: String,
    age: Number,
    email: String,
    password: String,
    phoneNumber: Number,
    idCard: String,
    role: String,
    Covtest: [{ type: Schema.Types.ObjectId, ref: Covtest }],
    updated_at: { type: Date, default: Date.now },

})

module.exports = mongoose.model('User', UserSchema)