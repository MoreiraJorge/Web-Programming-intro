const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name: String,
    address: String,
    age: Number,
    email: { type: String },
    password: { type: String},
    phoneNumber: Number,
    idCard: { type: String },
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