var express = require('express');
var router = express.Router();
var Admin = require("../controllers/AdmController");
const authorize = require('../middleware/authorize')

//get Admin
router.get('/', authorize(['ADM']), function (req, res) {
    Admin.getAdmin(req, res)
})

/*create admin -> ROUTE CREATED ON PURPOSE FOR ADMIN TESTS!
DO NOT PUT ROLE ON BODY, ITS ADM BY DEFAULT
used to create admin if doesn´t exist. Uncoment here, in Admcontroller
and coment the restriction in the User schema
*/
/*
router.post('/', function (req, res) {
    Admin.createUser(req, res)
})
*/

//Update Admin password
router.put('/changePass/:id', authorize(['ADM']), function (req, res) {
    Admin.updatePassword(req, res)
})


module.exports = router;

