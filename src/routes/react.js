const express = require('express');
const router = express.Router();

const triggerTypesCtrl = require('../../DB/mongo/controllers/triggerTypes');
const doTypesCtrl = require('../../DB/mongo/controllers/doTypes');

router.get('/doTypes', async (request, response) => {
	try {
		const res = await doTypesCtrl.index();
		response.status(200).send(res);
	}
	catch (error) {
		response.status(500).send(error.toString());
		throw error;
	}
});
router.get('/triggerTypes', async (request, response) => {
	try {
		const res = await triggerTypesCtrl.index();
		response.status(200).send(res);
	}
	catch (error) {
		response.status(500).send(error.toString());
		throw error;
	}
});
router.post('/triggerTypes/add', async (request, response) => {
	try {
		const bloqueado = false;
		if (!bloqueado) {
			const { id, nome } = request.body;
			if (!id || !nome) {
				response.status(403).send('{id, nome}');
			}
			const dados = { id, nome };
			const save = await triggerTypesCtrl.store(dados);
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
router.post('/doTypes/add', async (request, response) => {
	try {
		const bloqueado = false;
		if (!bloqueado) {
			const { id, nome } = request.body;
			if (!id || !nome) {
				response.status(403).send('{id, nome}');
			}
			const dados = { id, nome };
			const save = await doTypesCtrl.store(dados);
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


module.exports = router;

