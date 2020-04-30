require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const fetch = require('node-fetch')

const cors = require('cors')

const apiRouter = require('./api/routes/index')

const app = express()
mongoose.Promise = global.Promise

// Object destructuring ES6
const {
	PORT = 3000,
	MONGO_DB_HOST = 'localhost',
	MONGO_BD_PORT = 27017,
	MONGO_DB_NAME = 'demo2'
} = process.env

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

app.set('view engine', 'ejs')
app.use(express.json())
app.use('/api', cors(), apiRouter)

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`)
})
