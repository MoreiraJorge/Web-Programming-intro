var express = require('express');
var router = express.Router();
var User = require("../controllers/UserController")

//List tests
router.get('/userList',function(req, res){
    User.listUsers(req,res)
})

//Create covid test
router.post('/create', function(req,res){
    User.createUser(req,res)
})

module.exports = router;