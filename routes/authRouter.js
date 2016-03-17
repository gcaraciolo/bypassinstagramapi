 'use strict'

const express 		= require('express'),
	  AuthInstagram	= require('../auth/authInstagram').AuthInstagram()

const router = express.Router()

router.route('/instagram/callback')
      .get(AuthInstagram.handleAuth)	

module.exports = router