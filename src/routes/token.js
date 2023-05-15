const express = require('express');
const router = express.Router();

const { newDate, clog } = require('../../modules/tools');
const moment = require('moment');
const atob = require('atob');
const jwt = require('jsonwebtoken');
const key = process.env.AUTH_KEY;
const usersCtrl = require('../../DB/mongo/controllers/users');

const tokenCtrl = require('../../DB/mongo/controllers/token');

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

router.post('/login', async (request, response) => {
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

		console.log('LOGIN', ip, host, userAgent);

		const login = request.body.login;
		const password = request.body.password;

		console.log('login,password', login, password);

		const usr = await usersCtrl.login(login, password);

		if (!usr) {response.send('Login fall', 401);}


		const time = new Date().getTime();
		const idToken = usr.id + time;


		const token = jwt.sign(
			{
				id:usr.id,
				username:usr.username,
				discriminator:usr.discriminator,
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

		response.status(200).send({ token });

	}
	catch (error) {
		response.status(401).send(error);
	}


});

module.exports = router;

