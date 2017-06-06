'use strict';

//Calling the NODE_ENV based js file. This is to further config the envoirment in production
module.exports = require('./env/' + process.env.NODE_ENV + '.js');