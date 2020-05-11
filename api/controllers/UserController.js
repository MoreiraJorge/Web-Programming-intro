var mongoose = require("mongoose");
const User = require('../models/User')
const bcrypt = require('bcrypt');

var UserController = {};

//list all users
UserController.listUsers = async (req, res) => {
    const list = await User.find().
        populate('covtest')
    res.json(list);
}

//find one user
UserController.findOneUser = async (req, res) => {
    const result = await User.findOne({ idCard: req.params.id }).
        populate('covtest')
    res.json(result);
}

//create user
UserController.createUser = async (req, res) => {
    const encryptedPass = bcrypt.hashSync(req.body.password, 10);

    const newData =
    {
        ...req.body,
        password: encryptedPass
    }

    const result = await User.create(newData);
    res.json(result);
}

//delete user
UserController.deleteUser = async (req, res) => {
    const result = await User.findOneAndDelete({ code: req.params.id });
    res.json(result)
}

//update user
UserController.updateUser = async (req, res) => {

    await User.findOneAndUpdate({ idCard: req.params.id }, req.body)
    const result = await User.findOne({ idCard: req.params.id }).
    populate('covtest')

    res.json(result)
}

module.exports = UserController