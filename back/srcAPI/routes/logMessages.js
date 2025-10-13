const express = require('express');
const router = express.Router();

const logMessagesCtrl = require('../../DB/mongo/controllers/logMessages');


router.get('/getLasts', async (request, response) => {
	const qtde = request.body?.qtde || 10;
	console.log('qtde', qtde);
	try {
		const res = await logMessagesCtrl.getLasts(qtde);
		response.status(200).send(res);
	}
	catch (error) {
		response.status(500).send(error.toString());
		throw error;
	}
});

module.exports = router;

