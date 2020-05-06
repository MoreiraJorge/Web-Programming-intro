var express = require('express');
var router = express.Router();
var Covtest = require("../controllers/CovtestController");

//List tests
router.get('/testList',function(req, res){
    Covtest.listTests(req, res)
})

//Create covid test
router.post('/create', function(req,res){
    Covtest.createTest(req, res)
})

/*
//route to display test
router.put('/update/:id', function(req,res){
    Covtest.updateTest(req, res)
})
*/

//update test status
router.put('/update/TestStatus/:id', function(req,res){
    Covtest.updateTestStatus(req, res)
})

//update user test status
router.put('/update/TestUserStatus/:id', function(req,res){
    Covtest.updateTestUserStatus(req,res)
})

//update test result
router.put('/update/TestResult/:id', function(req,res){
    Covtest.updateTestResult(req,res)
})

module.exports = router;