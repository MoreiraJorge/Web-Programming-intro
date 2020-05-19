const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name: String,
    address: String,
    age: Number,
    email: { type: String, unique: false, required: false },
    password: { type: String, required: false },
    phoneNumber: Number,
    idCard: { type: String, unique: true, required: false },
    role: String,
    covtest: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Covtest' }],
    updated_at: { type: Date, default: Date.now }

})


UserSchema.pre('save', function (next) {
    if (this.role !== "ADM") {
        next()
    } else {
        throw new Error('Not valid')
    }
})


module.exports = mongoose.model('User', UserSchema)