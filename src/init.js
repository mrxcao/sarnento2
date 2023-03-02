const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const tokenCtrl = require('../DB/mongo/controllers/token');

const cors = require('cors');
const compression = require('compression');
const auth = require('./auth');
const routes = require('./routes');

// const atob = require('atob');
const whitelist = ['http://localhost:8090'];


const corsOptionsDelegate = async function(req, callback) {
	let corsOptions;
	const remote = (
		req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress
	).split(',')[0];
	if (whitelist.indexOf(req.header('Origin')) !== -1) {
		corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
	}
	else {
		corsOptions = { origin: false }; // disable CORS for this request
	}
	console.log('corsOptions', corsOptions, remote);
	callback(null, corsOptions);

};

const init = async function() {
	app.use(express.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(compression());
	app.use(cors({ preflightContinue: true }));
	app.use(cors(corsOptionsDelegate));

	app.use(function(req, res, next) {
		req.connection.setNoDelay(true);
		next();
	});

	auth(app, tokenCtrl);
	routes(app, tokenCtrl);


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