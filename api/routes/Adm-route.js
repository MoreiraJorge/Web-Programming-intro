var express = require('express');
var router = express.Router();
var Admin = require("../controllers/AdmController");

//Update Admin password
router.put('/changePass/:id',function(req, res){
    Admin.updatePassword(req, res)
})

//get Admin
router.put('/',function(req, res){
    Admin.getAdmin(req, res)
})

module.exports = router;

