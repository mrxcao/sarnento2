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

router.get('/filter', async (request, response) => {
	try {
		const filters = {
			guildId: request.query.guildId,
			userId: request.query.userId,
			startDate: request.query.startDate,
			endDate: request.query.endDate
		};
		
		const res = await logMessagesCtrl.getFiltered(filters);
		response.status(200).send(res);
	}
	catch (error) {
		console.error(error);
		response.status(500).send(error.toString());
	}
});

module.exports = router;

