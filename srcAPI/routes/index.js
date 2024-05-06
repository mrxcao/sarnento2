const express = require('express');
const router = express.Router();
const status = require('../../modules/status');
// eslint-disable-next-line no-unused-vars

router.get('/', function(req, res) {
	const data = {
		ok:true,
	};
	res.status(200).send(data);
});

router.post('/post', async (req, res) => {
	if (req.body) {
		res.status(200).json({ ok:true, data: req.body });
	}
	else {
		res.status(500).json({ ok:false, data: req.body });
	}
});

router.get('/status', async (req, res) => {
	const data = await status.get();
	if (data) {
		res.status(200).json(data);
	}
	else {
		res.status(500).json({ ok:false, data: req.body });
	}
});
module.exports = router;

