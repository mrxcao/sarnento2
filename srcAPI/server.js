const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const errorMidware = require('./middlewares/errorMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');

const routerIndex = require('./routes/index');
const routerToken = require('./routes/token');
const routerReact = require('./routes/react');
const routerLogMessages = require('./routes/logMessages');
const routerSettings = require('./routes/settings')
const routerSentenceTypes = require('./routes/sentenceTypes')
const routerSentences = require('./routes/sentences')
const routerGuilds = require('./routes/guilds')
const debugMode = process.env.NODE_ENV === 'development' ? true : false;
// const key = process.env.AUTH_KEY;

const app = express();

app.use((req, res, next) => {
  const debugProd = true;
	if (debugProd || (debugMode && req.method !== 'OPTIONS')) {
		console.log('::', req.method, req.url, req.ip, req.get('Origin'), req.rawHeaders[5]);
	}
	next();
});

// config
const allowedOrigins = ['http://localhost:3001', 'http://seu-dominio-producao.com'];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204 
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

// process
 
// public
app.use('/', routerIndex);
app.use('/token', routerToken);
// Private
app.use('/react',authMiddleware, routerReact);
app.use('/logMessages',authMiddleware, routerLogMessages);
app.use('/settings',authMiddleware, routerSettings);
app.use('/sentenceTypes',authMiddleware, routerSentenceTypes);
app.use('/sentences',authMiddleware, routerSentences);
app.use('/guilds',authMiddleware, routerGuilds);

// const auth = require('./auth');

// rotas
/*
app.use('/erro', (req, res, next) => {
	throw new Error('erro simulado');
  });
app.get('/', (req, res, next) => {
	res.send('ok');
  });
app.post('/', (req, res, next) => {
	res.send({ ok: true, body: req.body });
});
  */
app.use(errorMidware);

module.exports = app;
