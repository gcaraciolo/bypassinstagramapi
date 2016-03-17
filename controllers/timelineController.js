'use strict'

const httpStatus    = require('http-status'),
      serverError   = require('../utils/serverError'),
      api 			= require('../utils/singleton').instagramModule(),
      appToken      = require('../utils/singleton').appToken,
	  constants 	= require('../constants'),
	  utils 		= require('../utils/myUtils')


function response(filterBy, cb) {
	let allMedias = []

	function createMedia(media) {
		return { 
			image_url: media.images.standard_resolution.url,
			thumb_url: media.images.thumbnail.url, 
			video_url: media.videos && media.videos.standard_resolution.url,
			file_size: '..' 
		}
	}

	function isPhoto(media) {
		return media.type == 'image'
	}

	function isVideo(media) {
		return media.type == 'video'
	}

	function addOnlyPhotos(medias) {
		medias.forEach( (media, index) => {
			if(isPhoto(media)) {
				allMedias.push(createMedia(media))
			}
		})			
	}

	function addOnlyVideos(medias) {
		medias.forEach( (media, index) => {
			if(isVideo(media)) {
				allMedias.push(createMedia(media))
			}
		})			
	}

	function addPhotoAndVideo(medias) {
		medias.forEach( (media, index) => {
			allMedias.push(createMedia(media))			
		})
	}

	let mediaCallback = (err, medias, pagination, remaining, limit) => {
		if (err) return next(err)

		switch (filterBy) {
			case 'photos':
				addOnlyPhotos(medias)
				break;
			case 'videos':
				addOnlyVideos(medias)
				break;	
			default:
				addPhotoAndVideo(medias)
				break;
		}

		if(pagination.next) {
			pagination.next(mediaCallback); 
		} else {
			cb(allMedias)
		}
	}

	return mediaCallback
}


module.exports.findUserId = (req, res, next) => {
	api.user_search(req.params.profileName, function (err, users, remaining, limit) {
		if (err) return next(err) 

		if (users.length == 0) {
			return res.status(httpStatus.BAD_REQUEST).json(serverError.userNotFound)	
		} else if(users.length > 1) {
			return res.status(httpStatus.BAD_REQUEST).json({r: 'por favor informe o nome exato do perfil'})
		}
		req.bypassInstagramAPI.userId = users[0].id
		next()
	})
}

module.exports.getTimeline = (req, res, next) => { 	
	api.user_media_recent(req.bypassInstagramAPI.userId, {}, response('', (medias) => {
		res.status(httpStatus.OK).json(utils.responseArray(medias))	
	}))	
}

module.exports.getPhotos = (req, res, next) => { 
	api.user_media_recent(req.bypassInstagramAPI.userId, {}, response('photos', (medias) => {
		res.status(httpStatus.OK).json(utils.responseArray(medias))	
	}))	
}

module.exports.getVideos = (req, res, next) => { 
	api.user_media_recent(req.bypassInstagramAPI.userId, {}, response('videos', (medias) => {
		res.status(httpStatus.OK).json(utils.responseArray(medias))	
	}))	
}

















