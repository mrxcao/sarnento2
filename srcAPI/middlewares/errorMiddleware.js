module.exports = ((error, req) => {
	const err = `${error.method} ${error.url} ${error.ip} ${error.message} ${error.erro} `;
	// console.error('||  error', err);
	throw new Error(err);
});
