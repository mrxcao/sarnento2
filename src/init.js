const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');
const dnsPromises = dns.promises;
const { expressjwt: jwt } = require('express-jwt');
const lessMiddleware = require('less-middleware');
const tools = require('../modules/tools');
const isRevokedCallback = require('../modules/isRevokedCallback');


const tokenCtrl = require('../DB/mongo/controllers/token');

const cors = require('cors');
const compression = require('compression');
// const auth = require('./auth');
const routerIndex = require('./routes/index');
const routerToken = require('./routes/token');
const routerReact = require('./routes/react');

// const atob = require('atob');
const key = process.env.AUTH_KEY;
const whitelist = [];
const publicRoutes = [
	{ url: '/', methods: ['GET'] },
	{ url: /^\/token\/login*/, methods: ['POST'] },
	{ url: /^\/token\/geraToken*/, methods: ['POST'] },
	{ url: /\/token\/isTokenvalid*/, methods: ['GET'] },
	{ url: /\/stylesheets*/i, methods: ['GET'] },
	{ url: /\/favicon.ico*/, methods: ['GET'] },
];

const corsOptionsDelegate = async function(req, callback) {
	let corsOptions;
	const remote = (
		req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress
	).split(',')[0];

	const isPublic = await tools.searchInArrayObj(publicRoutes, 'url', req.url);
	const rotasAutorizadas = await rotaAutorizada(req);

	if (isPublic && (isPublic || []).length > 0) {
		corsOptions = { origin: true };
	}
	else if (rotasAutorizadas) {
		corsOptions = { origin: true };
	}
	else if (whitelist.indexOf(req.header('Origin')) !== -1 ||
			whitelist.indexOf(remote) !== -1
	) {
		corsOptions = { origin: true };
	}
	else {

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
	const dadosToken = await tokenCtrl.show({ ativo: true, token: token });
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

	app.use(jwt({
		secret: key,
		algorithms: ['HS256'],
		isRevoked: isRevokedCallback,
	}).unless({ path:publicRoutes }),
	);

	app.use(function(req, res, next) {
		req.socket.setNoDelay(true);
		next();
	});
	// auth(app, tokenCtrl);

	// rotas
	app.use('/', routerIndex);
	app.use('/token', routerToken);
	app.use('/react', routerReact);

	// views
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');

	app.use(lessMiddleware(path.join(__dirname, 'public')));
	app.use(express.static(path.join(__dirname, 'public')));


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