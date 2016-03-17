'use strict'

module.exports.handle = (filterBy, cb) => {
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
		if (err) return cb(err, null)

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
			cb(null, allMedias)
		}
	}

	return mediaCallback
}