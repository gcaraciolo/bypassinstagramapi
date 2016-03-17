'use strict'

const httpStatus    	= require('http-status'),
	  serverError 		= require('./serverError'),
	  constants  		= require('../constants'),
	  authInstagram     = require('../auth/authInstagram')

module.exports.handleError = (err, res) => {
	console.log(err);
	if (err) {
		switch (err.error_type) {
			case 'APINotAllowedError':
				return res.status(400).json(serverError.notAllowedError)
			default:
				return res.status(400).json(serverError.unknownError)
		}
	}
}

module.exports.checkEnvironmentVariables = () => {
	let status = 	constants.INSTAGRAM_API_CLIENT_ID &&
					constants.INSTAGRAM_API_CLIENT_SECRET ||
			process.env.INSTAGRAM_TOKEN
	if(!status) throw Error('As variaveis de ambiente nao foram inicializadas!')
}

module.exports.responseArray = (array) => {
	return {
		total: array.length, 
		result: array
	}
}
