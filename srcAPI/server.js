const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });

const express = require('express');
const app = express();
const lessMiddleware = require('less-middleware');
const bodyParser = require('body-parser');
const dns = require('dns');
const dnsPromises = dns.promises;
const helmet = require('helmet');

const tokenCtrl = require('../DB/mongo/controllers/token');
const debugMode = process.env.NODE_ENV === 'development' ? true : false;

const cors = require('cors');
const compression = require('compression');

// const atob = require('atob');
const key = process.env.AUTH_KEY;
const isRevokedCallback = require('../modules/isRevokedCallback');

const { expressjwt: jwt } = require('express-jwt');

const tools = require('../modules/tools');


const consultaRotas = async (ip, token) => {
	// console.log('ip, token', ip, token);
	const ipHostsAutorizados = [];
	const dadosToken = await tokenCtrl.show({ ativo: true, token: token });
	// console.log('dadosToken', dadosToken);
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
	// console.log('existeHost ip', ip, dadosToken);
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

const whitelist = ['http://btramos.com',
	'http://localhost',
	'http://localhost:3001',
	'http://sarnento.app.br',
	'https://sarnento.app.br'];
const publicRoutes = [
	{ url: '/', methods: ['GET'] },
	{ url: /^\/token\/login*/, methods: ['POST'] },
	{ url: /^\/token\/geraToken*/, methods: ['POST'] },
	{ url: /\/token\/isTokenvalid*/, methods: ['GET'] },
	{ url: /\/token\/validar*/, methods: ['GET'] },
	{ url: /\/stylesheets*/i, methods: ['GET'] },
	{ url: /\/favicon.ico*/, methods: ['GET'] },
];


const corsOptionsDelegate = async function(req, callback) {
	// console.log('req.header(Origin)', req.header('Origin'));
	let corsOptions;
	const remote = (
		req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress
	).split(',')[0];

	// console.log('publicRoutes', publicRoutes);
	const isPublic = await tools.searchInArrayObj(publicRoutes, 'url', req.url);
	// console.log('isPublic', isPublic);

	if (isPublic && (isPublic || []).length > 0) {
		corsOptions = { origin: true };
	}
	else {
		const rotasAutorizadas = await rotaAutorizada(req);
		if (rotasAutorizadas) {
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
	// console.log('rotaAutorizada', 1);
	const remote = (
		req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress
	).split(',')[0];
	// console.log('rotaAutorizada remote', remote);

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


app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


app.use(compression());
app.use(cors({ preflightContinue: true }));
app.use(cors(corsOptionsDelegate));

app.use((req, res, next) => {
	if (debugMode && req.method !== 'OPTIONS') {
		console.log('::', req.method, req.url, req.ip, req.get('Origin'), req.rawHeaders[5]);
	}
	next();
});
app.use(jwt({
	secret: key,
	algorithms: ['HS256'],
	isRevoked: isRevokedCallback,
}).unless({ path:publicRoutes }),
);
app.use(helmet());

app.use(function(req, res, next) {
	// console.log('app.use(function(req ', req.rawHeaders);

	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-Auth-Token, Content-Type, Content-Length, Authorization, Access-Control-Allow-Headers, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials');

	req.socket.setNoDelay(true);
	next();
});
// auth(app, tokenCtrl);


// const auth = require('./auth');
const routerIndex = require('./routes/index');
const routerToken = require('./routes/token');
const routerReact = require('./routes/react');
const routerLogMessages = require('./routes/logMessages');

// rotas
app.use('/', routerIndex);
app.use('/token', routerToken);
app.use('/react', routerReact);
app.use('/logMessages', routerLogMessages);

// views
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;
