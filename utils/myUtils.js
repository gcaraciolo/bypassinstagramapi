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
				return res.status(400).json({r: 'perfil privado'})
			default:
				return res.status(400).json(serverError.unknownError)
		}
	}
}