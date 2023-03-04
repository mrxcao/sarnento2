const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');
const dnsPromises = dns.promises;
const expressJWT = require('express-jwt');

const isRevokedCallback = require('../modules/isRevokedCallback');


const tokenCtrl = require('../DB/mongo/controllers/token');

const cors = require('cors');
const compression = require('compression');
const auth = require('./auth');
const routes = require('./routes');

// const atob = require('atob');
const key = process.env.AUTH_KEY;
const whitelist = [];
const publicRoutes = [
	{ url: /^\/*/, methods: ['GET'] },
	{ url: /^\/geraToken*/, methods: ['POST'] },
	{ url: /^\/login*/, methods: ['POST'] },
	{ url: /\/isTokenvalid*/, methods: ['GET'] },
];
app.use(expressJWT({
	secret: key,
	isRevoked: isRevokedCallback,
}).unless({ path:publicRoutes }),
);


const corsOptionsDelegate = async function(req, callback) {
	let corsOptions;
	const remote = (
		req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress
	).split(',')[0];
	const retorno = await rotaAutorizada(req);
	if (retorno) {
		console.log('--', 1, retorno);
		corsOptions = { origin: true };
	}
	if (whitelist.indexOf(req.header('Origin')) !== -1 ||
			whitelist.indexOf(remote) !== -1
	) {
		console.log('--', 2);
		corsOptions = { origin: true };
	}
	else {
		console.log('--', 3);
		corsOptions = { origin: false };
	}


	if (!corsOptions.origin) {
		callback(new Error(` Not allowed by CORS .... 
		                     ${remote}
		                     Origin: ${req.header('Origin')} `));
	}
	else {
		callback(null, corsOptions);
	}
};

const rotaAutorizada = async (req) => {
	const remote = (
		req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress
	).split(',')[0];

	const ip = remote.substring(7, 25);
	let retorno = false;
	let token = req.headers['authorization'];
	token = token ? token.split(' ')[1] : null;


	const rota = await consultaRotas(ip, token);
	console.log('rota', rota);
	if (rota && rota.length > 0) {
		retorno = true;
	}
	else {
		retorno = false;
	}
	return retorno;

};

const consultaRotas = async (ip, token) => {
	const ipHostsAutorizados = [];

	console.log('token', token);
	const dadosToken = await tokenCtrl.show({ ativo: true, token: token });
	console.log('dadosToken', dadosToken);
	if (((dadosToken || []).ip || []).length < 1) {
		return dadosToken;
	}
	const ipOK = ((dadosToken.ip || []).includes(ip) == true);
	if (ipOK) {
		return dadosToken;
	}
	else {
		if (ipHostsAutorizados.includes(ip) == true) return dadosToken;
		const ok = await existeHost(dadosToken, ip);
		if (ok) {
			ipHostsAutorizados.push(ip);
			return dadosToken;
		}
	}

};
const existeHost = async (dadosToken, ip) => {
	let retorno = false;
	const hosts = dadosToken.hosts || [];
	for (const h of hosts) {
		if (h.nome) {
			const dnsIp = await dnsPromises.lookup(h.nome);
			if (ip == dnsIp.address) {
				retorno = true;
			}
		}
	}
	return retorno;
};
const init = async function() {
	app.use(express.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(compression());
	app.use(cors({ preflightContinue: true }));
	app.use(cors(corsOptionsDelegate));

	app.use(function(req, res, next) {
		req.socket.setNoDelay(true);
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