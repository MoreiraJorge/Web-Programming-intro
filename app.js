//get dependencies
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
//const fetch = require('node-fetch')
const cookieParser = require('cookie-parser')
var swaggerUi = require('swagger-ui-express')
var swaggerDocument = require('./swagger.json')
const fileUpload = require('express-fileupload')
const sessionMiddleware = require('./api/middleware/session')

const HomeRouter = require('./routes/Index')

const cors = require('cors')

//get the api base route
const apiRouter = require('./api/index')

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

//api setup
app
	//view engine setup
	.set('view engine', 'ejs')

	.use(express.json())
	.use(express.urlencoded({ extended: true }))

	//views
	.use(HomeRouter)

	// Setup cookie parser
	.use(cookieParser())

	// Setup session middleware
	.use(sessionMiddleware)

	//dispose public folder
	.use(express.static('public'))

	//swagger doc setup
	.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
	.use('/api', cors(), apiRouter)

	.listen(PORT, () => {
	console.log(`Views on http://localhost:${PORT}/`)
	console.log(`API started on http://localhost:${PORT}/api`)
	console.log(`API started on http://localhost:${PORT}/api-docs`)
})
