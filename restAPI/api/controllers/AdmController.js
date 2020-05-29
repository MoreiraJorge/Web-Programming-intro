var mongoose = require("mongoose");
const User = require('../models/User')
const bcrypt = require('bcrypt');

var AdmController = {};

//Update Admin password (admin)
AdmController.updatePassword = async (req, res) => {
    try {
        if (req.body.password == "undefined") {
            res.json('empty password')
        } else {
            console.log(req.body.password)
            const encryptedPass = bcrypt.hashSync(req.body.password, 10);

            const newData =
            {
                password: encryptedPass
            }

            await User.findOneAndUpdate({ idCard: req.params.id, role: "ADM" }, newData);
            const result = await User.find({ idCard: req.params.id, role: "ADM" })
            res.json(result)

        }
    } catch (err) {
        console.log(err)
    }
}

//find the admin (admin)
AdmController.getAdmin = async (req, res) => {
    try {
        const result = await User.findOne({ role: "ADM" })
        res.json(result)
    } catch (err) {
        console.log(err)
    }
}

module.exports = AdmController