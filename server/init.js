// http req server

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
	res.send('ok');
});
app.post('/post', async (req, res) => {
	req.body;
	console.log('req', req.body);
	// res.send(req.body);
	res.status(200).json({ ok:true, data: req.body });
});

app.listen(process.env.PORT);
console.log(`:: http:\\\\127.0.0.1:${process.env.PORT}`);
