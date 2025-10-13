const express = require('express');
const router = express.Router();

const { newDate } = require('../../modules/tools');
const moment = require('moment');
const atob = require('atob');
const jwt = require('jsonwebtoken');

const usersCtrl = require('../../DB/mongo/controllers/users');
const tokenCtrl = require('../../DB/mongo/controllers/token');

const key = process.env.AUTH_KEY;
const debugMode = process.env.DEBUG === 'true' ? true : false;

const usersController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/dadosToken', async (request, response) => {
	try {
		if (!request.headers.authorization) {
			response.status(401).send('Token de autenticação não enviado',	request.headers.authorization);
			return;
		}
		const auth = atob(request.headers.authorization.split('.')[1]);
		response.send(auth);
	}
	catch (error) {
		response.status(500).send(error.toString());
		throw error;
	}
});
router.post('/geraToken', async (request, response) => {
	try {
		const bloqueado = true;
		if (!bloqueado) {
			const { name } = request.body;
			let { dataFim } = request.body;
			dataFim = moment(dataFim).utcOffset(0).endOf('day').toDate();
			const dataFimTime = moment(dataFim).utcOffset(0).endOf('day').valueOf();
			const dataInicio = newDate(new Date());
			const token = jwt.sign(
				{
					dataInicio,
					dataFim,
					name,
					iss: 'sarnento2@fbramos.com',
				},
				key,
				{ expiresIn: dataFimTime },
			);
			const dados = {
				dataInicio,
				dataFim,
				name,
				token,
				ativo: true,
			};
			const save = await tokenCtrl.store(dados);
			response.send(save);
		}
		else {
			response.status(403).send('bloquear flag is true');
		}
	}
	catch (error) {
		response.status(500).send(error.toString());
		throw error;
	}
});
router.get('/isTokenValid/:token', async (request, response) => {
	if (!request.params.token) {
		response.status(500).send('token não informado');
	}
	try {
		const decoded = jwt.verify(request.params.token, key);
		response.send(decoded);
	}
	catch (err) {
		response.send(false);
	}
});

router.get('/validar', async (request, response) => {
	let token = request.headers.authorization;
	token = token.replace('Bearer ', '');
	console.log('----- request.headers.authorization',request.headers.authorization);
	try {
		const decoded = jwt.verify(token, key);
		if (decoded) {
			response.send(true);
		}
		else {
			response.send(false);
		}
	}
	catch (err) {
		// console.log('err', err);
		response.send(false);
	}
});

router.post('/login', usersController.doLogin);
router.post('/logout', usersController.doLogout);

/*
// Privates
app.get('/settings', authMiddleware, settingsController.get);
app.post('/settings', authMiddleware, settingsController.set);
*/


/*
	try {
		const remote = (
			request.headers['x-forwarded-for'] ||
			request.connection.remoteAddress ||
			request.socket.remoteAddress ||
			request.connection.socket.remoteAddress
		).split(',')[0];

		const ip = (remote.split(':') || [])[3] || '';
		const host = request.get('host');
		// let browser = await getBrowser(request);
		const userAgent = request.headers['user-agent'];
		// if (browser == "unknown") {
		//   throw `erro Brw !!! => ${browser}`;
		// }

		// console.log('LOGIN', ip, host, userAgent);

		const login = request.body.login;
		const password = request.body.password;

		console.log('login, password', login, password);

		//		const user = await usersCtrl.login({ login, password });
		const user = await usersCtrl.doLogin(request, response) ;


		if (!user) {
			response.status(401).send('Login fall');
		}
		else {
			const time = new Date().getTime();
			const idToken = user.id + time;

			const token = jwt.sign(
				{
					id:user.id,
					username:user.username,
					discriminator:user.discriminator,
					function:'manager',
					iss: 'sarnentola',
					timeLog: time,
					jti: idToken,
				},
				key,
				{
					expiresIn: '12h',
				},
			);

			const ret = { token,
				user: {
					username: user.username,
					discriminator: user.discriminator,
					avatar: user.avatar },
			};

			debugMode ? console.log('-- login: ', login, ip, host, userAgent) : true;
			response.status(200).send(ret);

		}
	}
	catch (error) {
		response.status(401).send(error);
	}


});
*/

module.exports = router;

