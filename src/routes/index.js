const express = require('express');
const router = express.Router();

// eslint-disable-next-line no-unused-vars

router.get('/', function(req, res) {
	// res.status(200).send('ok');
	// res.render('index', { status: 'ON' });
});

router.post('/post', async (req, res) => {
	console.log('req', req.data);
	if (req.body) {
		res.status(200).json({ ok:true, data: req.body });
	}
	else {
		res.status(500).json({ ok:false, data: req.body });
	}

});


module.exports = router;

