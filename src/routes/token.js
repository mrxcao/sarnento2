const express = require('express');
const router = express.Router();

const { newDate } = require('../../modules/tools');
const moment = require('moment');
const atob = require('atob');
const jwt = require('jsonwebtoken');
const key = process.env.AUTH_KEY;
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
router.get('/isTokenValid/:token', (request, response) => {
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

module.exports = router;

