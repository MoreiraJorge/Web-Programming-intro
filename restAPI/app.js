require('dotenv').config() // It must be the first line of code

const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const mongoose = require('mongoose')

var swaggerUi = require('swagger-ui-express')
var swaggerDocument = require('./swagger.json')
const sessionMiddleware = require('./api/middleware/session')
const User = require('./api/models/User')
const bcrypt = require('bcrypt');
var fs = require('fs');


let publicPath = 'public'

if (!fs.existsSync(publicPath)) {
	fs.mkdirSync(publicPath);
}

const apiRouter = require('./api')

const app = express()

// Read values from environment variables
const PORT = process.env.APP_PORT
const MONGO_DB_HOST = process.env.MONGO_DB_HOST
const MONGO_DB_PORT = process.env.MONGO_DB_PORT
const MONGO_DB_DATABASE_NAME = process.env.MONGO_DB_DATABASE_NAME
const ATLAS_PASS = process.env.ATLAS_PASS

mongoose.Promise = global.Promise

//mongo connection
//connect to atlas, but if atlas is offline, create local DB
mongoose
	.connect(
		//`mongodb+srv://DBuser1:${ ATLAS_PASS }@cluster0-91k9g.mongodb.net/test?retryWrites=true&w=majority` || 
		`mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_DATABASE_NAME}`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		}
	)
	.then(async (mongoose) => {
		console.log('connected to mongo')
		const adminUser = await User.findOne({ role: 'ADM' }).select('+password')
		if (!adminUser) {
			console.log('creating admin user')
			const encryptedPass = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10);
			const adminUser = await new User({
				name: process.env.ADMIN_USERNAME,
				password: encryptedPass,
				email: process.env.ADMIN_EMAIL,
				idCard: process.env.ADMIN_IDCARD,
				role: 'ADM'
			})
				.save()
				.catch(console.error)

			if (adminUser) {
				console.log('Admin created')
				console.table([adminUser.toJSON()])
			}
		} else {
			console.log('Admin:')
			console.table([adminUser.toJSON()])
		}
	})
	.catch(console.error)


// Set API Router at /api endpoint and enable cors
// If you do not use angular proxy
const whitelist = ['http://localhost:4200', 'http://localhost:3000', 'http://localhost', 'https://moreirajorge.github.io', 'http://192.168.1.9:4200']
const corsOptions = {
	credentials: true,
	origin: function (origin, callback) {
		console.log("Origin -> " + origin)
		if (!origin || whitelist.includes(origin)) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	}
}

//api setup
app
	.use(express.json({ limit: '50mb' }))
	.use(express.urlencoded({ extended: false, limit: '50mb' }))

	// Setup cookie parser
	.use(cookieParser())

	// Setup session middleware
	.use(sessionMiddleware)

	//dispose public folder
	.use(express.static('public'))

	//swagger doc setup
	.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

	.use('/api', cors(corsOptions), apiRouter)

	.listen(PORT, () => {
		console.log(`API started on http://localhost:${PORT}/api`)
		console.log(`API started on http://localhost:${PORT}/api-docs`)
	})
