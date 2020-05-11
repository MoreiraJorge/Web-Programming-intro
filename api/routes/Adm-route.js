var express = require('express');
var router = express.Router();
var Admin = require("../controllers/AdmController");

//get Admin
router.get('/',function(req, res){
    Admin.getAdmin(req, res)
})

//Update Admin password
router.put('/changePass/:id',function(req, res){
    Admin.updatePassword(req, res)
})


module.exports = router;

