var mongoose = require("mongoose");
const Covtest = require('../models/Covtest')
const User = require('../models/User')

var uniqid = require('uniqid');

var CovtestController = {};

//list tests (admin)
CovtestController.listTests = async (req, res) => {
    const testList = await Covtest.find().
        populate('user', ['name', 'idCard'])
    res.json(testList);
}

//create test with associated user (user)
CovtestController.createTest = async (req, res) => {
    const targetUser = req.params.id;

    const randomCode = uniqid.process('', '-Covtest')
    const newData =
    {
        ...req.body,
        code: randomCode,
        //associate the user that created the test
        user: targetUser,
        testStatus: "pending"

    }

    //create test
    const test = await Covtest.create(newData)
    //put the test in the user/patient test list
    await User.findOneAndUpdate({ _id: req.params.id, role: "EXT" }, { $push: { covtest: test._id } })

    //find the created test and populate to show user
    const result = await Covtest.find({ _id: test._id }).populate('user', ['name', 'idCard'])

    res.json(result);
}

//update user status on test (techs)
CovtestController.updateTestUserStatus = async (req, res) => {

    const newData =
    {
        userStatus: req.body.userStatus
    }

    await Covtest.findOneAndUpdate({ code: req.params.id }, newData);
    const result = await Covtest.find({ code: req.params.id })
    res.json(result)
}

//update test status (techs)
CovtestController.updateTestStatus = async (req, res) => {

    const newData =
    {
        testStatus: req.body.testStatus,
    }

    await Covtest.findOneAndUpdate({ code: req.params.id }, newData);
    const result = await Covtest.find({ code: req.params.id })
    res.json(result)
}

//update test result (techs)
CovtestController.updateTestResult = async (req, res) => {

    const newData =
    {
        testResult: req.body.testResult
    }

    await Covtest.findOneAndUpdate({ code: req.params.id }, newData);
    const result = await Covtest.find({ code: req.params.id })
    res.json(result)
}

//get test list from a specific user (user)
CovtestController.listUserTests = async (req, res) => {

    const result = await Covtest.find({ "user": req.params.id })
    res.json(result)

}

//get test list with pending tests (techs)
CovtestController.listPend = async (req, res) => {

    const result = await Covtest.find({ testStatus: "pending" })
    res.json(result)

}

//get test list with positive result (techs)
CovtestController.listPos = async (req, res) => {

    const result = await Covtest.find({ testResult: "Positive" })
    res.json(result)

}

//get test list with negative result (techs)
CovtestController.listNeg = async (req, res) => {

    const result = await Covtest.find({ testResult: "Negative" })
    res.json(result)

}


module.exports = CovtestController