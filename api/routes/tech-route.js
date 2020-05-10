var express = require('express');
var router = express.Router();
var Tech = require("../controllers/TechController")

router.delete('/:id', function(req, res) {
    Tech.deleteUserTech(req,res)
})

module.exports = router;