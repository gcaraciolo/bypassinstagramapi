'use strict'

const express 		= require('express'),
	  bodyParser 	= require('body-parser'),
	  utils 		= require('./utils/myUtils')
 
const app = express()
const port = process.env.PORT || 3000
const handlerApiRouter = require('./routes/index')
const apiRoutes = express.Router()

apiRoutes.use(handlerApiRouter)
utils.checkEnvironmentVariables() 

app.use(bodyParser.urlencoded())
app.use('/', registerAppName, apiRoutes)
app.use(handleError)

app.listen(port)
console.log('api on!!')

//Helper
function registerAppName(req, res, next) { 
	req.bypassInstagramAPI = {}
	next()
}

function handleError(err, req, res, next) {
	return UTILS.handleError(err,res)	
}