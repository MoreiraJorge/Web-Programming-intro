require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const fetch = require('node-fetch')
var swaggerUi = require('swagger-ui-express')
var swaggerDocument = require('./swagger.json')

const cors = require('cors')

const apiRouter = require('./api/routes')

const app = express()
mongoose.Promise = global.Promise

// Object destructuring ES6
const {
	PORT = 3000,
	MONGO_DB_HOST = 'localhost',
	MONGO_BD_PORT = 27017,
	MONGO_DB_NAME = 'demo2'
} = process.env

//mongo connection
mongoose
	.connect(
		`mongodb://${ MONGO_DB_HOST }:${ MONGO_BD_PORT }/${ MONGO_DB_NAME }`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		}
	)
	.then((mongoose) => {
		console.log('connected to mongo')
	})
	.catch(console.error)

//view engine setup
app.set('view engine', 'ejs')
app.use(express.json())

//swagger doc setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api', cors(), apiRouter)

app.listen(PORT, () => {
	console.log(`API started on http://localhost:${PORT}/api`)
	console.log(`API started on http://localhost:${PORT}/api-docs`)
})
