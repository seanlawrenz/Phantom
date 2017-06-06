'use strict';

//Grabs and renders the controller
module.exports = function(app){
	var index = require('../controllers/index.server.controller');
	app.get('/', index.render);
};