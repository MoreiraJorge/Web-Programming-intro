var express = require('express');
var router = express.Router();
var Tech = require("../controllers/TechController")
const authorize = require('../middleware/authorize')

//create tech user-
router.post('/create', authorize(['ADM']), function (req, res) {
    Tech.createUserTech(req, res)
})

//list all users in role tech-
router.get('/techList', authorize(['ADM']), function (req, res) {
    Tech.listUserTech(req, res)
})

//delete a specific tech user-
router.delete('/:id', authorize(['ADM']), function (req, res) {
    Tech.deleteUserTech(req, res)
})

//update specific tech user-
router.put('/:id', authorize(['ADM']), function (req, res) {
    Tech.updateUserTech(req, res)
})

//get specific tech user-
router.get('/:id', authorize(['ADM']), function (req, res) {
    Tech.findOneUserTech(req, res)
})

module.exports = router;