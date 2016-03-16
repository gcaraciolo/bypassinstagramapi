'use strict' 

const Singleton = (function () {
    let instance
 
    function createInstance() {
        const api = require('instagram-node').instagram()
        return api
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

const Token = (function () {
    let token
    
    return {
        getToken: () => {
            return token            
        }, 
        setToken: (aToken) => {
            token = aToken
        }
    };
})();

module.exports.instagramModule = Singleton.getInstance
module.exports.appToken = Token
