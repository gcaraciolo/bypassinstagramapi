'use strict'

const express 				= require('express'),
	  timelineController 	= require('../controllers/timelineController')

const router = express.Router()

router.route('/:profileName')
      .get(timelineController.findUserId, timelineController.getTimeline)

router.route('/:profileName/fotos')
      .get(timelineController.findUserId, timelineController.getPhotos)
      
router.route('/:profileName/videos')
	  .get(timelineController.findUserId, timelineController.getVideos)

	

module.exports = router