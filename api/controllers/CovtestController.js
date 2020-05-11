var mongoose = require("mongoose");
const Covtest = require('../models/Covtest')
const User = require('../models/User')

var uniqid = require('uniqid');

var CovtestController = {};

//list tests
CovtestController.listTests = async (req, res) => {
    const testList = await Covtest.find().
        populate('user', 'name')
    res.json(testList);
}

//create test
CovtestController.createTest = async (req, res) => {
    const targetUser = req.params.id;

    const randomCode = uniqid.process('', '-Covtest')
    const newData =
    {
        ...req.body,
        code: randomCode,
        //associate the user that created the test
        user: targetUser

    }


    const result = await Covtest.create(newData);

    //update the user info of the tests
    await User.findOneAndUpdate({ _id: req.params.id, role: "EXT" }, { $push: { covtest: result._id } })

    res.json(result);
}

//update user status on test
CovtestController.updateTestUserStatus = async (req, res) => {

    const newData =
    {
        userStatus: req.body.userStatus
    }

    await Covtest.findOneAndUpdate({ code: req.params.id }, newData);
    const result = await Covtest.find({ code: req.params.id })
    res.json(result)
}

//update test status
CovtestController.updateTestStatus = async (req, res) => {

    const newData =
    {
        testStatus: req.body.testStatus,
    }

    await Covtest.findOneAndUpdate({ code: req.params.id }, newData);
    const result = await Covtest.find({ code: req.params.id })
    res.json(result)
}

//update test result
CovtestController.updateTestResult = async (req, res) => {

    const newData =
    {
        testResult: req.body.testResult
    }

    await Covtest.findOneAndUpdate({ code: req.params.id }, newData);
    const result = await Covtest.find({ code: req.params.id })
    res.json(result)
}

module.exports = CovtestController