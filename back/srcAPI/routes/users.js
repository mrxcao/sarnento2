const express = require('express');
const router = express.Router();

const usersController = require('../../DB/mongo/controllers/users');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', async (request, response) => {
	try {
        // Passando query params para o controller tratar filtros
		const res = await usersController.index(request.query);
		response.status(200).send(res);
	}
	catch (error) {
		response.status(500).send(error.toString());
		throw error;
	}
});

module.exports = router;
