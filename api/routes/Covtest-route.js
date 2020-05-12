var express = require('express');
var router = express.Router();
var Covtest = require("../controllers/CovtestController")
var fileController = require("../controllers/FileController")
const fileUpload = require('express-fileupload');

router.use(fileUpload())

//List tests
router.get('/testList',function(req, res){
    Covtest.listTests(req, res)
})

//Create covid test
router.post('/create/:id', function(req,res){
    Covtest.createTest(req, res)
})

//update test status
router.put('/update/testStatus/:id', function(req,res){
    Covtest.updateTestStatus(req, res)
})

//update user test status
router.put('/update/testUserStatus/:id', function(req,res){
    Covtest.updateTestUserStatus(req,res)
})

//update test result
router.put('/update/testResult/:id', function(req,res){
    Covtest.updateTestResult(req,res)
})

//Upload PDF file of Covid Test
router.put('/upload/:id', function (req, res) {
    fileController.upload(req, res)
})

//Download PDF file of result Covid Test
router.get('/download/:id', function (req, res) {
    fileController.download(req, res)
})

module.exports = router;