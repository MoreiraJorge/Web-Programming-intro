var mongoose = require("mongoose");
const User = require('../models/User')

var UserController = {};

UserController.listUsers = async (req, res) => {
    const list = await User.find().
    populate('covtest')
    res.send(list);
}

UserController.findOneUser = async (req, res) => {
    //const result = await User.find({ idCard: req.params.id }).
    //populate('covtest')
    //res.send(result);
}

UserController.createUser = async (req, res) => {
    const result = await User.create(req.body);
    res.send(result);
}

module.exports = UserController