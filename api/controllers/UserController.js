var mongoose = require("mongoose");
const User = require('../models/User')
const bcrypt = require('bcrypt');

var UserController = {};

//list all users
UserController.listUsers = async (req, res) => {
    const list = await User.find({ role: "EXT" }).
        populate('covtest')
    res.json(list);
}

//find one user
UserController.findOneUser = async (req, res) => {
    const result = await User.findOne({ idCard: req.params.id, role: "EXT" }).
        populate('covtest')
    res.json(result);
}

//create user
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

//delete user
UserController.deleteUser = async (req, res) => {
    const result = await User.findOneAndDelete({ idCard: req.params.id, role: "EXT" });
    res.json(result)
}

//update user
UserController.updateUser = async (req, res) => {

    await User.findOneAndUpdate({ idCard: req.params.id}, req.body)
    const result = await User.findOne({ idCard: req.params.id }).
        populate('covtest')
    res.json(result)

}


const setRole = async (req,_,next) => {
	try {
		const user = await User
            .findOne(req.params.id)
			.catch((e) => {
				return {}
			})
		if (user) {
			user.role === "EXT"
			next()
		} else {
			next(new Error('not found'))
		}
	} catch (e) {
		next(e)
	}
}


module.exports = {UserController, setRole}