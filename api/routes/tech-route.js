var express = require('express');
var router = express.Router();
var Tech = require("../controllers/TechController")

//create tech user
router.post('/create', function(req, res){
    Tech.createUserTech(req,res)
})

//list all users in role tech
router.get('/techList', function(req, res){
    Tech.listUserTech(req,res)
})

//delete a specific tech user
router.delete('/:id', function(req, res) {
    Tech.deleteUserTech(req,res)
})

//update specific tech user
router.put('/:id', function(req, res) {
    Tech.updateUserTech(req, res)
})

//get specific tech user
router.get('/:id', function(req, res){
    Tech.findOneUserTech(req,res)
})

module.exports = router;