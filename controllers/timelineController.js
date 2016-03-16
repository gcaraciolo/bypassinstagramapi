'use strict'

const httpStatus    = require('http-status'),
      serverError   = require('../utils/serverError'),
      api 			= require('../utils/singleton').instagramModule(),
      appToken      = require('../utils/singleton').appToken,
	  constants 	= require('../constants')

module.exports.getTimeline = (req, res, next) => { 

	api.user_search(req.params.profileName, function (err, users, remaining, limit) {
		if (err) return next(err) 

		if (users.length == 0) {
			return res.status(200).json({r: 'usuário nao encontrado'})	
		} else if(users.length > 1) {
			return res.status(200).json({r: 'por favor informe o nome exato do perfil'})
		}

		let userId = users[0].id
		api.user_media_recent(userId, function(err, medias, pagination, remaining, limit) {
			if (err) return next(err)
				
			res.status(200).json(medias)	
		})		
	})
	
}

module.exports.getPhotos = (req, res, next) => { 
 	res.status(200).json({ok: ok})   
}

module.exports.getVideos = (req, res, next) => { 
    res.status(200).json({ok: ok})   
}

module.exports.goToProfileName = (req, res, next) => {
	res.status(404).json(serverError.badUrlRequest)
}























