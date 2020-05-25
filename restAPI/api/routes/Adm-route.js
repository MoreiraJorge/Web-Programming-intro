var express = require('express');
var router = express.Router();
var Admin = require("../controllers/AdmController");
const authorize = require('../middleware/authorize')

//get Admin
router.get('/', authorize(['ADM']), function (req, res) {
    Admin.getAdmin(req, res)
})

//Update Admin password
router.put('/changePass/:id', authorize(['ADM']), function (req, res) {
    Admin.updatePassword(req, res)
})


module.exports = router;

