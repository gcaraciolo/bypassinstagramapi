'use strict'

const express 		= require('express'),
	  AuthInstagram = require('../auth/authInstagram').AuthInstagram()

const router = express.Router()

router.use('/auth', 	require('./authRouter'))
router.use('/timeline', AuthInstagram.verifyToken, require('./timelineRouter'))

module.exports = router