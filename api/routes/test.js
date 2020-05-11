const express = require('express')

const authorize = require('../middleware/authorize')

const testRouter = express.Router()

testRouter.get('/list', (req, res) => {
	res.json([{ name: 'a' }])
})
testRouter.post('/list', authorize(['REGULAR']), (req, res) => {
	console.log(req.body)
	res.json({ created:'ok' })
})

module.exports = testRouter
