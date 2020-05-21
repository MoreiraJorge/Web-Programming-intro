var mongoose = require("mongoose");
const User = require('../models/User')
const bcrypt = require('bcrypt');

var AdmController = {};

//Update Admin password (admin)
AdmController.updatePassword = async (req, res) => {
    const encryptedPass = bcrypt.hashSync(req.body.password, 10);

    const newData =
    {
        password: encryptedPass
    }

    await User.findOneAndUpdate({ idCard: req.params.id, role: "ADM" }, newData);
    const result = await User.find({ idCard: req.params.id, role: "ADM" })
    res.json(result)
}

//find the admin (admin)
AdmController.getAdmin = async (req, res) => {
    const result = await User.findOne({role: "ADM"})
    res.json(result)
}

//create admin -> FUNCTION CREATED ON PURPOSE FOR ADMIN TESTS!
/*
AdmController.createUser = async (req, res) => {
    try {

        if (req.body.role == null) {
            const encryptedPass = bcrypt.hashSync(req.body.password, 10);
            const newData =
            {
                ...req.body,
                role: "ADM",
                password: encryptedPass
            }
            const result = await User.create(newData);
            res.json(result);
        } else {
            console.log("User is ADM by default");
            res.send()
        }

    } catch (err) {
        console.log(err)
    }
}
*/

module.exports = AdmController