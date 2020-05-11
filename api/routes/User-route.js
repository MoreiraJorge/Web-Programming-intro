var express = require('express');
var router = express.Router();
var User = require("../controllers/UserController")

//List users
router.get('/userList',function(req, res){
    User.listUsers(req,res)
})

//get specific user by ID
router.get('/:id',function(req, res){
    User.findOneUser(req,res)
})

//Create user
router.post('/create', function(req,res){
    User.createUser(req,res)
})

//delete user
router.delete('/:id', function(req, res) {
    User.deleteUser(req, res)
})

//update user
router.put('/:id', function(req, res) {
    User.updateUser(req, res)
})

//add tests to user test list
router.put('/tests/:id', function(req, res) {
    User.addCovTests(req,res)
})

//add tests to user test list
router.delete('/tests/:id', function(req, res) {
    User.remCovTests(req, res)
})


module.exports = router;