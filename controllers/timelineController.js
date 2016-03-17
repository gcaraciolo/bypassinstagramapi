'use strict'

const httpStatus    = require('http-status'),
      serverError   = require('../utils/serverError'),
      api 			= require('../utils/singleton').instagramModule(),
      appToken      = require('../utils/singleton').appToken,
	  constants 	= require('../constants'),
	  utils 		= require('../utils/myUtils'),
	  HandleMediaData = require('../utils/handleMediaData')

module.exports.findUserId = (req, res, next) => {
	api.user_search(req.params.profileName, function (err, users, remaining, limit) {
		if (err) return next(err) 

		if (users.length == 0) {
			return res.status(httpStatus.BAD_REQUEST).json(serverError.userNotFound)	
		} else if(users.length > 1) {
			return res.status(httpStatus.BAD_REQUEST).json(serverError.tooManyUsers)
		}
		req.bypassInstagramAPI.userId = users[0].id
		next()
	})
}

module.exports.getTimeline = (req, res, next) => { 	
	api.user_media_recent(req.bypassInstagramAPI.userId, {}, HandleMediaData.handle('', (medias) => {
		res.status(httpStatus.OK).json(utils.responseArray(medias))	
	}))	
}

module.exports.getPhotos = (req, res, next) => { 
	api.user_media_recent(req.bypassInstagramAPI.userId, {}, HandleMediaData.handle('photos', (medias) => {
		res.status(httpStatus.OK).json(utils.responseArray(medias))	
	}))	
}

module.exports.getVideos = (req, res, next) => { 
	api.user_media_recent(req.bypassInstagramAPI.userId, {}, HandleMediaData.handle('videos', (medias) => {
		res.status(httpStatus.OK).json(utils.responseArray(medias))	
	}))	
}

















