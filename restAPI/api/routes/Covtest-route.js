var express = require('express');
var router = express.Router();
var Covtest = require("../controllers/CovtestController")
var fileController = require("../controllers/FileController")
const fileUpload = require('express-fileupload');
const authorize = require('../middleware/authorize')

router.use(fileUpload())

//List tests
router.get('/testList', authorize(['TECH']), function (req, res) {
    Covtest.listTests(req, res)
})

//Create covid test with a id from  user
router.post('/create/:id', authorize(['EXT']), function (req, res) {
    Covtest.createTest(req, res)
})

//update test status
router.put('/update/testStatus/:id', authorize(['TECH']), function (req, res) {
    Covtest.updateTestStatus(req, res)
})

//update user test status
router.put('/update/testUserStatus/:id', authorize(['TECH']), function (req, res) {
    Covtest.updateTestUserStatus(req, res)
})

//update test result
router.put('/update/testResult/:id', authorize(['TECH']), function (req, res) {
    Covtest.updateTestResult(req, res)
})

//Upload PDF file of Covid Test
router.put('/upload/:id', authorize(['TECH']), function (req, res) {
    fileController.upload(req, res)
})

//Download PDF file of result Covid Test
router.get('/download/:id', authorize(['TECH', 'EXT']), function (req, res) {
    fileController.download(req, res)
})

//list tests of user
router.get('/listTest/:id', authorize(['TECH']), function (req, res) {
    Covtest.listUserTests(req, res)
})

//list pending tests
router.get('/pending', authorize(['TECH']), function (req, res) {
    Covtest.listPend(req, res)
})

//list positive tests
router.get('/positive', authorize(['TECH']), function (req, res) {
    Covtest.listPos(req, res)
})

//list negative tests
router.get('/negative', authorize(['TECH']), function (req, res) {
    Covtest.listNeg(req, res)
})

//count tests
router.get('/count', authorize(['ADM']), function (req, res) {
    Covtest.countTest(req, res)
})

//update schedule
router.put('/schedule/:id', authorize(['TECH']), function (req, res) {
    Covtest.schedule(req, res)
})

//numberTestsOnDay
router.get('/schedCount/:date', authorize(['ADM']), function (req, res) {
    Covtest.nTestsDay(req, res)
})

//numberTests per person
router.get('/nTestsPerson/:id', authorize(['ADM']), function (req, res) {
    Covtest.nTestsPerson(req, res)
})


module.exports = router;