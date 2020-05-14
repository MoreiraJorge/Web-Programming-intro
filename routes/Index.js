const express = require('express')
const fs = require('fs');
const fetch = require('node-fetch')
const PORT = 3000

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


HomeRouter.post('/login', (req, res) => {
    const email = req.body.email 
    const password = req.body.password 

    fetch(`http://localhost:${PORT}/api/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then((result) => result.json())
        .then((result) => {

            if (result.role === "ADM") {
                res.render('../views/Admin.ejs', { user: result })
            } else if (result.role === "TECH") {
                res.render('../views/Techs.ejs', { user: result })
            } else if (result.role === "EXT") {
                res.render('../views/Externals.ejs', { user: result })
            } else {
                res.send("Wrong Role")
            }

        })
})


module.exports = HomeRouter
