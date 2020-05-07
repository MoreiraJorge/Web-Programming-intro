var mongoose = require("mongoose");
const User = require('../models/User')

var UserController = {};

UserController.listUsers = async (req, res) => {
    const list = await User.find().populate('Covtest')
    res.send(list);
}

UserController.createUser = async (req, res) => {
    const result = await User.create(req.body);
    res.send(result);
}

module.exports = UserController