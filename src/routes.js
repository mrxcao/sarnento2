module.exports = (app, tokenCtrl) => {

	app.get('/', async (req, res) => {
		res.status(200).send('ok');
	});
	app.post('/post', async (req, res) => {
		req.body;
		console.log('req', req.body);
		// res.send(req.body);
		res.status(200).json({ ok:true, data: req.body });
	});

};