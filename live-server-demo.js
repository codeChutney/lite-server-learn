//this file reads the arguments from either the command line or live-server.json file
var fs = require('fs'),
	path = require('path'),
	assign = require('object-assign'),
	liveServer = require('./main');
require('colors');	

//logger - use log4j
var printObject = function(anObject){
	var out = '';
	for(var prop in anObject){
		out += '\t' + prop.yellow + ': ' + anObject[prop] + '\n';
	}
	console.log(out);
}

//setup defaults
var opts = {
	port: process.env.PORT,
	open: true,
	mount: [],
	logLevel: 2
}

//try to get the live-server.json 
var homeDir = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
var configPath = path.join(homeDir, 'live-server.json');
if(fs.existsSync(configPath)){
	var userConfig = fs.readFileSync(configPath, 'utf-8');
	assign(opts, JSON.parse(userConfig));
}

var arg;
for(var counter = process.argv.length - 1; counter >= 2 ; counter--){
	arg = process.argv[counter];
	if (arg.indexOf("--port=") > -1) {
		var portString = arg.substring(7);
		var portNumber = parseInt(portString, 10);
		if (portNumber == portString) {
			opts.port = portNumber;
		}
	}
	
	if (arg.indexOf("--host=") > -1) {
		opts.host = arg.substring(7);
	}
}

//logging	
//printObject(process.env);
printObject(opts);

liveServer.start();