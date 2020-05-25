var mongoose = require("mongoose");
const User = require('../models/User')
const bcrypt = require('bcrypt');

var UserController = {};

//list all users (admin)
UserController.listAllUsers = async (req, res) => {
    const list = await User.find().
        populate('covtest', 'code')
    res.json(list);
}

//list all External users (tech)
UserController.listExtUsers = async (req, res) => {
    const list = await User.find({ role: "EXT" }).
        populate('covtest', 'code')
    res.json(list);
}

//find one user (tech)
UserController.findOneUser = async (req, res) => {
    const result = await User.findOne({ idCard: req.params.id, role: "EXT" }).
        populate('covtest', 'code')
    res.json(result);
}

//create user (tech)
UserController.createUser = async (req, res) => {
    try {

        if (req.body.role == null) {
            const encryptedPass = bcrypt.hashSync(req.body.password, 10);
            const newData =
            {
                ...req.body,
                role: "EXT",
                password: encryptedPass
            }
            const result = await User.create(newData);
            res.json(result);
        } else {
            console.log("User is external by default");
            res.send()
        }

    } catch (err) {
        console.log(err)
    }
}

//delete user (tech)
UserController.deleteUser = async (req, res) => {
    const result = await User.findOneAndDelete({ idCard: req.params.id, role: "EXT" });
    res.json(result)
}

//update user (tech)
UserController.updateUser = async (req, res) => {

    const userData = req.body
    if (userData.role !== 'EXT') {
        userData.role = 'EXT'
    }

    await User.findOneAndUpdate({ idCard: req.params.id, role: "EXT" }, userData)
    const result = await User.findOne({ idCard: req.params.id }).
        populate('covtest')
    res.json(result)

}

//add covid tests to user test list (tech)
UserController.addCovTests = async (req, res) => {

    await User.findOneAndUpdate({ idCard: req.params.id, role: "EXT" }, { $push: { covtest: req.body.covtest } })
    const result = await User.findOne({ idCard: req.params.id }).
        populate('covtest')
    res.json(result)

}

//remove covid test from user test list (tech)
UserController.remCovTests = async (req, res) => {

    await User.findOneAndUpdate({ idCard: req.params.id, role: "EXT" }, { $pull: { covtest: req.body.covtest } })
    const result = await User.findOne({ idCard: req.params.id }).
        populate('covtest')
    res.json(result)

}

UserController.countInfected = async (req, res) => {
    try {
        console.log("aqui")
        const result = await User.countDocuments({ infected: true })
        res.json(result)
    } catch (err) {
        console.log(err)
    }
}

module.exports = UserController