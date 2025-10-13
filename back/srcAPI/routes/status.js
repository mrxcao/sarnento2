const express = require('express');
const router = express.Router();
const status = require('../../modules/status');

router.get('/', async (req, res) => {
	const data = await status.get();
	if (data) {
		res.status(200).json(data);
	}
	else {
		res.status(500).json({ ok:false, data: req.body });
	}
});

module.exports = router;