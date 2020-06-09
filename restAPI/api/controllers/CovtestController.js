const Covtest = require('../models/Covtest')
const User = require('../models/User')
const nodemailer = require("nodemailer");

var uniqid = require('uniqid');

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

var CovtestController = {};

//list tests
CovtestController.listTests = async (req, res) => {
    try {
        const testList = await Covtest.find().
            populate('user', ['name', 'idCard'])
        res.json(testList);
    } catch (err) {
        console.log(err)
    }
}

//create test with associated user (user)
CovtestController.createTest = async (req, res) => {
    try {
        const targetUser = req.params.id;

        const randomCode = uniqid.process('', '-Covtest')
        const newData =
        {
            ...req.body,
            code: randomCode,
            //associate the user that created the test
            user: targetUser,
            userStatus: "suspeito",
            testStatus: "pending",
            testResult:"awaiting result"
        }

        //create test
        const test = await Covtest.create(newData)
        //put the test in the user/patient test list
        await User.findOneAndUpdate({ _id: req.params.id, role: "EXT" }, { $push: { covtest: test._id } })

        //find the created test and populate to show user
        const result = await Covtest.find({ _id: test._id }).populate('user', ['name', 'idCard'])

        res.json(result);
    } catch (err) {
        console.log(err)
    }
}

//update user status on test (techs)
CovtestController.updateTestUserStatus = async (req, res) => {
    try {
        const newData =
        {
            userStatus: req.body.userStatus
        }

        await Covtest.findOneAndUpdate({ code: req.params.id }, newData);
        const result = await Covtest.find({ code: req.params.id })
        res.json(result)
    } catch (err) {
        console.log(err)
    }
}

//update test status (techs)
/*
CovtestController.updateTestStatus = async (req, res) => {
    try {
        const newData =
        {
            testStatus: req.body.testStatus,
        }

        await Covtest.findOneAndUpdate({ code: req.params.id }, newData);
        const result = await Covtest.find({ code: req.params.id })
        res.json(result)
    } catch (err) {
        console.log(err)
    }
}
*/

//update test result (techs)
CovtestController.updateTestResult = async (req, res) => {
    try {
        const newData =
        {
            testResult: req.body.testResult,
            testStatus: "done"
        }

        await Covtest.findOneAndUpdate({ code: req.params.id }, newData);
        const result = await Covtest.find({ code: req.params.id })
        res.json(result)
    } catch (err) {
        console.log(err)
    }
}

//get test list from a specific user (user)
CovtestController.listUserTests = async (req, res) => {
    try {
        const user = await User.find({ idCard: req.params.id }, { _id: 1 })
        const userID = user[0]._id
        const result = await Covtest.find({ user: userID }).populate('user', 'idCard')

        res.json(result)

    } catch (err) {
        console.log(err)
    }
}

//get test list with pending tests (techs)-
CovtestController.listPend = async (req, res) => {
    try {
        const result = await Covtest.find({ testStatus: "pending" })
        res.json(result)
    } catch (err) {
        console.log(err)
    }
}

//get test list with positive result (techs)
CovtestController.listPos = async (req, res) => {
    try {
        const result = await Covtest.find({ testResult: "positive" })
        res.json(result)
    } catch (err) {
        console.log(err)
    }
}

//get test list with negative result (techs)
CovtestController.listNeg = async (req, res) => {
    try {
        const result = await Covtest.find({ testResult: "negative" })
        res.json(result)
    } catch (err) {
        console.log(err)
    }
}

//Count tests (ADM)
CovtestController.countTest = async (req, res) => {
    try {
        const result = await Covtest.estimatedDocumentCount()
        res.json(result)
    } catch (err) {
        console.log(err)
    }
}

//change schedule
CovtestController.schedule = async (req, res) => {
    try {
        const newData =
        {
            schedule: req.body.schedule
        }

        await Covtest.findOneAndUpdate({ code: req.params.id }, newData)
        const result = await Covtest.findOne({ code: req.params.id }).populate('user')

        var mailOptions = {
            to: result.user.email,
            subject: 'Agendamento de teste COVID-19',
            text: `O seu teste foi agendado para: ${ req.body.schedule }`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.json(result)
    } catch (err) {
        console.log(err)
    }
}

//number tests in a day
CovtestController.nTestsDay = async (req, res) => {
    try {
        const result = await Covtest.countDocuments({ schedule: req.params.date })
        res.json(result)
    } catch (err) {
        console.log(err)
    }
}

//number tests per person
CovtestController.nTestsPerson = async (req, res) => {
    try {
        const user = await User.find({ idCard: req.params.id }, { _id: 1 })
        const userID = user[0]._id
        const result = await Covtest.countDocuments({ user: userID })
        res.json(result)
    } catch (err) {
        console.log(err)
    }
}

//number tests per day
CovtestController.nTestPerDay = async (req, res) => {
    try {
        const result = await Covtest.aggregate([
            {
                $group: {
                    _id: {
                        // https://docs.mongodb.com/manual/reference/operator/aggregation/dateToString/
                        $dateToString: { format: "%Y-%m-%d", date: "$schedule" },
                    },
                    total: { $sum: 1 },
                },
            },
            {
                $project: {
                    date: "$_id",
                    totalEvents: "$total",
                    _id: false
                },
            },
            {
                $sort: { date: 1 },
            },
        ]).catch((e) => {
            console.log(e)
            return []
        })
        res.json({ "values": result })
    } catch (err) {
        console.log(err)
    }
}

CovtestController.getTestByID = async (req, res) => {
    try {
        const result = await Covtest.findOne({ code: req.params.id }).populate('user')
        res.json(result)
    } catch (err) {
        console.log(err)
    }
}

module.exports = CovtestController