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

		let wantedUser
		if (users.length == 0) {
			return res.status(httpStatus.BAD_REQUEST).json(serverError.userNotFound)	
		} else if(users.length > 1) {
			for (let index in users) {
				let user = users[index]
				if(user.username == req.params.profileName) {
					wantedUser = user
					break
				}
			}
		}		
		req.bypassInstagramAPI.userId = wantedUser ? wantedUser.id : users[0].id
		next()
	})
}

module.exports.getTimeline = (req, res, next) => { 	
	api.user_media_recent(req.bypassInstagramAPI.userId, {}, HandleMediaData.handle('', (err, medias) => {
		if(err) return next(err)
		res.status(httpStatus.OK).json(utils.responseArray(medias))	
	}))	
}

module.exports.getPhotos = (req, res, next) => { 
	api.user_media_recent(req.bypassInstagramAPI.userId, {}, HandleMediaData.handle('photos', (err, medias) => {
		if(err) return next(err)
		res.status(httpStatus.OK).json(utils.responseArray(medias))	
	}))	
}

module.exports.getVideos = (req, res, next) => { 
	api.user_media_recent(req.bypassInstagramAPI.userId, {}, HandleMediaData.handle('videos', (err, medias) => {
		if(err) return next(err)
		res.status(httpStatus.OK).json(utils.responseArray(medias))	
	}))	
}

















