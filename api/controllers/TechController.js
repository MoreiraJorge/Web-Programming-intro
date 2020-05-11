var mongoose = require("mongoose");
const User = require('../models/User')
const bcrypt = require('bcrypt');

var TechController = {};

//create tech user
TechController.createUserTech = async (req, res) => {
    const encryptedPass = bcrypt.hashSync(req.body.password, 10);

    const newData =
    {
        ...req.body,
        password: encryptedPass,
        role: "TECH"
    }
    const result = await User.create(newData);
    res.json(result);

}

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

//update tech user
TechController.updateUserTech = async (req, res) => {
    const user = await User.findOne({ idCard: req.params.id })

    if (user.role === "TECH") {
        await User.updateOne({_id: user._id}, req.body)
        const result = await User.findOne({ idCard: req.params.id }).
            populate('covtest')
        res.json(result)
    } else {
        console.log("User is not a tech")
        res.send()
    }
}

//list tech user
TechController.listUserTech = async (req, res) => {
    const list = await User.find({ role: "TECH" })
    res.json(list);
}

//findOne tech user
TechController.findOneUserTech = async (req, res) => {
    
    const user = await User.findOne({ idCard: req.params.id, role: "TECH"})
    if(user!=null){
        res.json(user)
    } else {
        res.send("there is no tech with this ID")
    }
}

module.exports = TechController