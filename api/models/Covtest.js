const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var User = require('../models/User')

const CovtestSchema = Schema({

    //_id: Schema.Types.ObjectId,
    code: String,
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
    User: { type: Schema.Types.ObjectId, ref: User },
    updated_at: { type: Date, default: Date.now },

})

module.exports = mongoose.model('Covtest', CovtestSchema)
