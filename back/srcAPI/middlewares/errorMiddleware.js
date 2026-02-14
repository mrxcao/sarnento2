module.exports = ((error, req, res, next) => {
	const err = `${req.method} ${req.url} ${req.ip} ${error.message} ${error.erro || ''} `;
	console.error('||  error', err);
	res.status(500).send({ error: error.message });
});
