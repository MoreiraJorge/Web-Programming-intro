var mongoose = require("mongoose");
const User = require('../models/User')

var TechController = {};

//create tech user

//delete tech user
TechController.deleteUserTech = async (req, res) => {
    const user = await User.findOne({ idCard: req.params.id })
    if (user.role === "TECH") {
        await user.remove()
        res.json(user)
    } else {
        console.log("User is not a tech")
        res.send()
    }
}

module.exports = TechController