const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name: String,
    address: String,
    age: Number,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phoneNumber: Number,
    infected: Boolean,
    idCard: { type: String, unique: true, required: true },
    role: {
        type: String,
        enum: ['ADM', 'TECH', 'EXT'],
        default: 'EXT',
        index: true
    },
    covtest: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Covtest' }],
    updated_at: { type: Date, default: Date.now }

})

module.exports = mongoose.model('User', UserSchema)