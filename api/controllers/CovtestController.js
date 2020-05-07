var mongoose = require("mongoose");
const Covtest = require('../models/Covtest')
var uniqid = require('uniqid');

var CovtestController = {};

CovtestController.listTests = async (req, res) => {
    const testList = await Covtest.find().
    populate('user', 'name')
    res.send(testList);
}

CovtestController.createTest = async (req, res) => {
    const randomCode = uniqid.process('', '-Covtest')
    const newData =
    {
        ...req.body,
        code: randomCode
    }
    const result = await Covtest.create(newData);
    res.send(result);
}

CovtestController.updateTestUserStatus = async (req, res) => {

    const newData =
    {
        userStatus: req.body.userStatus
    }

    await Covtest.findOneAndUpdate({ code: req.params.id }, newData);
    const result = await Covtest.find({ code: req.params.id })
    res.send(result)
}

CovtestController.updateTestStatus = async (req, res) => {

    const newData =
    {
        testStatus: req.body.testStatus,
    }

    await Covtest.findOneAndUpdate({ code: req.params.id }, newData);
    const result = await Covtest.find({ code: req.params.id })
    res.send(result)
}

CovtestController.updateTestResult = async (req, res) => {

    const newData =
    {
        testResult: req.body.testResult
    }

    await Covtest.findOneAndUpdate({ code: req.params.id }, newData);
    const result = await Covtest.find({ code: req.params.id })
    res.send(result)
}

module.exports = CovtestController