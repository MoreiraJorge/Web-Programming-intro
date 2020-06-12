var express = require('express');
var router = express.Router();
var User = require("../controllers/UserController")
const authorize = require('../middleware/authorize')

//List external users
router.get('/userListExt', authorize(['TECH', 'ADM']), function (req, res) {
    User.listExtUsers(req, res)
})

//count infected
router.get('/infected', authorize(['ADM']), function (req, res) {
    User.countInfected(req, res)
})

//count healthy users
router.get('/healthy', authorize(['ADM']), function (req, res) {
    User.countHealthy(req, res)
})

//get specific user by ID
router.get('/:id', authorize(['TECH']), function (req, res) {
    User.findOneUser(req, res)
})

//Create user
router.post('/create', authorize(['TECH']), function (req, res) {
    User.createUser(req, res)
})

//delete user
router.delete('/:id', authorize(['TECH']), function (req, res) {
    User.deleteUser(req, res)
})

//update user
router.put('/:id', authorize(['TECH']), function (req, res) {
    User.updateUser(req, res)
})

//remove tests to user test list
router.delete('/tests/:id', authorize(['TECH']), function (req, res) {
    User.remCovTests(req, res)
})

module.exports = router;