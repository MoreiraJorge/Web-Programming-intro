var mongoose = require("mongoose");
const User = require('../models/User')
const bcrypt = require('bcrypt');

var AdmController = {};

//Update Admin password
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

//find the admin
AdmController.getAdmin = async (req, res) => {
    const result = await User.findOne({role: "ADM"})
    res.json(result)
}

module.exports = AdmController