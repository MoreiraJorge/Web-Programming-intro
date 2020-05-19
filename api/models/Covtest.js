const mongoose = require('mongoose')

const CovtestSchema = new mongoose.Schema({

    code: { type: String},
    description: String,
    userHistory: String,
    userStatus: String,
    riskGroup: String,
    riskJob: String,
    testStatus: String,
    testResult: String,
    resultFile: String,
    isTestDone: Boolean,
    schedule: Date,
    saude24: Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updated_at: { type: Date, default: Date.now }

})

module.exports = mongoose.model('Covtest', CovtestSchema)
