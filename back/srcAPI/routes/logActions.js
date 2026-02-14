const express = require('express');
const router = express.Router();

const logActionCtrl = require('../../DB/mongo/controllers/logAction');

router.get('/filter', async (request, response) => {
	try {
		const filters = {
			guildId: request.query.guildId,
			userId: request.query.userId,
			startDate: request.query.startDate,
			endDate: request.query.endDate
		};
		
		const res = await logActionCtrl.getFiltered(filters);
		response.status(200).send(res);
	}
	catch (error) {
		console.error(error);
		response.status(500).send(error.toString());
	}
});

module.exports = router;
