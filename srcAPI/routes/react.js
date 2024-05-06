const express = require('express');
const router = express.Router();

const triggerTypesCtrl = require('../../DB/mongo/controllers/triggerTypes');
const doTypesCtrl = require('../../DB/mongo/controllers/doTypes');
const reactCtrl = require('../../DB/mongo/controllers/react');


router.get('/', async (request, response) => {
	try {
		const res = await reactCtrl.index();
		response.status(200).send(res);
	}
	catch (error) {
		response.status(500).send(error.toString());
		throw error;
	}
});
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
router.post('/add', async (request, response) => {
	try {
		const bloqueado = false;
		if (!bloqueado) {
			const { name, trigger } = request.body;
			const do_ = request.body.do;
			if (!trigger || !do_ || !name) {
				response.status(403).send('{trigger, do, name}');
			}

			const triggerObj = await triggerTypesCtrl.show(trigger.type);
			const doObj = await doTypesCtrl.show(do_.type);

			if (!triggerObj || !doObj || !do_.data || !trigger.data) {
				response.status(403).send('trigger or do invalid');
			}

			let dados = {};
			dados = { name, trigger: triggerObj[0], do:doObj[0] };
			dados.trigger.data = trigger.data;
			dados.do.data = do_.data;

			const save = await reactCtrl.store(dados);
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
router.delete('/del', async (request, response) => {
	try {
		const bloqueado = false;
		if (!bloqueado) {
			const { _id } = request.body;
			if (!_id) {
				response.status(403).send('{_id}');
			}
			const result = await reactCtrl.destroy(_id);
			response.send(result);
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
router.post('/triggerTypes/add', async (request, response) => {
	try {
		const bloqueado = false;
		if (!bloqueado) {
			const { id, name } = request.body;
			if (!id || !name) {
				response.status(403).send('{id, name}');
			}
			const dados = { id, name };
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
			const { id, name } = request.body;
			if (!id || !name) {
				response.status(403).send('{id, name}');
			}
			const dados = { id, name };
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

router.put('/triggerTypes/update', async (request, response) => {
	try {
		const bloqueado = false;
		if (!bloqueado) {
			const { id, name, expectedData } = request.body;
			if (!id || !name || !expectedData) {
				response.status(403).send('{id, name, expectedData}');
			}
			const dados = { id, name, expectedData };
			const save = await triggerTypesCtrl.update(dados);
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
router.put('/doTypes/update', async (request, response) => {
	try {
		const bloqueado = false;
		if (!bloqueado) {
			const { id, name, expectedData } = request.body;
			if (!id || !name || !expectedData) {
				response.status(403).send('{id, name, expectedData}');
			}
			const dados = { id, name, expectedData };
			const save = await doTypesCtrl.update(dados);
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

