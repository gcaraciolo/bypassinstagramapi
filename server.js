'use strict'

const express 		= require('express'),
	  bodyParser 	= require('body-parser'),
	  utils 		= require('./utils/myUtils')

	  
   
const app = express()
const port = process.env.PORT || 3000
const apiRoutes = express.Router()
const handlerApiRouter = require('./routes/index')

apiRoutes.use(handlerApiRouter)
app.use('/', apiRoutes)

app.use(bodyParser.urlencoded())

app.listen(port)
console.log('api on!!')

