'use strict'

const api          = require('../utils/singleton').instagramModule(),
      appToken     = require('../utils/singleton').appToken,
	    constants    = require('../constants'),
	    serverError  = require('../utils/serverError')
    

function AuthInstagram(req, res, next) {
  
  let originalUrl = req.originalUrl

  function authorizeUser() {
      api.use({
          client_id: constants.INSTAGRAM_API_CLIENT_ID,
          client_secret: constants.INSTAGRAM_API_CLIENT_SECRET
      })
      res.redirect(api.get_authorization_url(constants.INSTAGRAM_API_REDIRECT_URI, { scope: ['public_content']}));
  }

  function handleAuth(req, res, next) {
    api.authorize_user(req.query.code, constants.INSTAGRAM_API_REDIRECT_URI, function(err, result) {
      if (err) {
            console.log(err.body);
            res.status(400).json(serverError.unknownError);
        } else {
            appToken.setToken(result.access_token)
            res.redirect(originalUrl)
        }
      })
  }

  function verifyToken() { 
    if (appToken.getToken()) {
        api.use({ access_token: appToken.getToken()})
        next()
    } else {
        authorizeUser()
    }
  }

  return {
    handleAuth: handleAuth,
    verifyToken: verifyToken
  }
}

module.exports.AuthInstagram = AuthInstagram