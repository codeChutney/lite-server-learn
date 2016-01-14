require('colors');
var LiveServer = {};

LiveServer.start = function(options){
	console.log('The server has started'.green);
	console.log('The environment is', process.env.NODE_ENV.blue);
}

module.exports = LiveServer;