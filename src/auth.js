const key = process.env.AUTH_KEY;
const { newDate } = require('../modules/tools');
const isRevokedCallback = require('../modules/isRevokedCallback');
const moment = require('moment');
const atob = require('atob');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');


module.exports = (app, tokenCtrl) => {
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
	app.get('/dadosToken', async (request, response) => {
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
	app.post('/geraToken', async (request, response) => {
		try {
			const bloqueado = false;
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
		}
		catch (error) {
			response.status(500).send(error.toString());
			throw error;
		}
	});
	app.get('/isTokenValid/:token', (request, response) => {
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


};
