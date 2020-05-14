const express = require('express')
const fs = require('fs');

const HomeRouter = express.Router()

HomeRouter.get('/', (req, res) => {
    fs.readFile("./public/html/index.html", function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.write(data);
            return res.send();
        }
    })
})

HomeRouter.get('/admin', (req, res) => {
    fs.readFile("./view/Admin.ejs", function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.write(data);
            return res.send();
        }
    })
})


module.exports = HomeRouter
