var express = require('express');
var router = express.Router();
var Tech = require("../controllers/TechController")

router.post('/create', function(req, res){
    Tech.createUserTech(req,res)
})

router.get('/techList', function(req, res){
    Tech.listUserTech(req,res)
})

router.delete('/:id', function(req, res) {
    Tech.deleteUserTech(req,res)
})

router.put('/:id', function(req, res) {
    Tech.updateUserTech(req, res)
})

router.get('/:id', function(req, res){
    Tech.findOneUserTech(req,res)
})

module.exports = router;