const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });

const app = require('./server');

const init = async function() {

	const server = app.listen(process.env.PORT);
	console.log(`   http:\\\\127.0.0.1:${process.env.PORT}`);

	server.on('error', function(err) { console.log(' Error - ', err); });
	process.on('uncaughtException', function(err) {
		console.error(err.stack);
	});
	process.on('unhandledRejection', error => {
		console.log('unhandledRejection', error);
	});

};


module.exports = { init };