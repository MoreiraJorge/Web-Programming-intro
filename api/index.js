const express = require('express')

const apiRouter = express.Router()
const CovtestRouter = require('./routes/Covtest-route')
const UserRouter = require('./routes/User-route')
const TechRouter = require('./routes/tech-route')

apiRouter.get('/', (req, res) => {
	res.send({
		status: 'ok'
	})
})

apiRouter.use('/techs', TechRouter)
apiRouter.use('/users', UserRouter)
apiRouter.use('/covtests', CovtestRouter)

module.exports = apiRouter