var mongoose = require("mongoose");
const User = require('../models/User')
const bcrypt = require('bcrypt');
const { parse } = require('url')
const { parse: parseQuery } = require('querystring')
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
        user: 'trabalhopaw@gmail.com',
        pass: 'trabalho123456'
    }, tls: {
        rejectUnauthorized: false
    }
});

var UserController = {};

//list all External users (tech)
UserController.listExtUsers = async (req, res) => {
    try {
        const list = await User.find({ role: "EXT" }).
            populate('covtest', 'code')
        res.json(list);
    } catch (err) {
        console.log(err)
    }
}

//find one user (tech)
UserController.findOneUser = async (req, res) => {
    try {
        const result = await User.findOne({ idCard: req.params.id, role: "EXT" }).
            populate('covtest')
        res.json({ ...result.toJSON(), password: undefined });
    } catch (err) {
        console.log(err)
    }
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

            var mailOptions = {
                to: req.body.email,
                subject: 'Conta de utilizador',
                text: `Credenciais de sessão:
                        email: ${req.body.email}
                        password: ${ req.body.password}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

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
    try {
        const result = await User.findOneAndDelete({ idCard: req.params.id, role: "EXT" });
        res.json(result)
    } catch (err) {
        console.log(err)
    }
}

//update user (tech)
UserController.updateUser = async (req, res) => {
    try {
        const userData = req.body
        if (userData.role !== 'EXT') {
            userData.role = 'EXT'
        }

        await User.findOneAndUpdate({ idCard: req.params.id, role: "EXT" }, userData)
        const result = await User.findOne({ idCard: req.params.id }).
            populate('covtest')
        res.json(result)
    } catch (err) {
        console.log(err)
    }

}

//remove covid test from user test list (tech)
UserController.remCovTests = async (req, res) => {
    try {
        const q = parse(req.url)
        const query = parseQuery(q.query)

        await User.findOneAndUpdate({ idCard: req.params.id, role: "EXT" }, { $pull: { covtest: query.covtest } })
        const result = await User.findOne({ idCard: req.params.id }).
            populate('covtest')
        res.json(result)
    } catch (err) {
        console.log(err)
    }
}

UserController.countInfected = async (req, res) => {
    try {

        const list = await User.countDocuments({ role: 'EXT', infected: true })
        res.json(list);

    } catch (err) {
        console.log(err)
    }
}

UserController.countHealthy= async (req, res) => {
    try {

        const list = await User.countDocuments({ role: 'EXT', infected: false })
        res.json(list);

    } catch (err) {
        console.log(err)
    }
}

module.exports = UserController