const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt');

const sessionRouter = express.Router()

const SESSION_EXP = 600000
const {
	JWT_SECRET = 'this is for development'
} = process.env
const userJSON = {
	username: 'edgar',
	password: 'pass123',
	role: 'ADMIN' // 'REGULAR', 'EXTERNAL'
}
sessionRouter.post('/login', async (req, res, next) => {

	
	const user = await User.findOne({ email: req.body.email });
	bcrypt.compare(req.body.password, user.password, (err, result) => {
		if (err) {
			return res.status(401).json({
				message: "Auth failed"
			});
		}
		if (result) {
			const jwtToken = jwt.sign(JSON.stringify(user), JWT_SECRET)
			res.cookie(
				'session',
				jwtToken,
				{
					expires: new Date(Date.now() + SESSION_EXP),
					httpOnly: true
				}
			)
		}
		res.json(user)

	})
})
sessionRouter.get('/me', (req, res, next) => {
	res.json(req.user)
})


sessionRouter.post('/logout', (req, res, next) => {
	res.clearCookie('session')
	res.json({ success: 'true' })
})

module.exports = sessionRouter
