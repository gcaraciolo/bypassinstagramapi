'use strict'

const express 	= require('express'),
	  UTILS 	= require('../utils/myUtils'),
	  httpStatus    = require('http-status'),
      serverError   = require('../utils/serverError'),
      api 			= require('../utils/singleton').instagramModule(),
      appToken      = require('../utils/singleton').appToken,
	  constants 	= require('../constants'),
	  AuthInstagram = require('../auth/authInstagram').AuthInstagram

const router = express.Router()

let auth = null

function test(req, res, next) {
	auth = new AuthInstagram(req, res, next)  	
	auth.verifyToken()
}

router.use('/timeline', test, 	require('./timelineRouter'))
router.route('/auth/instagram/callback')
	  .get((req, res, next) => {
	  		auth.handleAuth(req, res)
	  })


router.use(function(err, req, res, next){
	return UTILS.handleError(err,res)	
})






module.exports = router