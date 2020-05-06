const express = require('express')

const apiRouter = express.Router()
const CovtestRouter = require('./Covtest-route')

apiRouter.get('/', (req, res) => {
	res.send({
		status: 'ok'
	})
})

apiRouter.use('/Covtests', CovtestRouter)

module.exports = apiRouter