'use strict'

const express 				= require('express'),
	  timelineController 	= require('../controllers/timelineController')

const router = express.Router()

router.route('/:profileName')
      .get(timelineController.getTimeline)

router.route('/:profileName/fotos')
      .get(timelineController.getPhotos)
      
router.route('/:profileName/videos')
	  .get(timelineController.getVideos)

router.route('/')
	  .get(timelineController.goToProfileName)
	   		

module.exports = router