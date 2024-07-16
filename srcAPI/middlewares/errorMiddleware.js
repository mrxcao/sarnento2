module.exports = ((error, req) => {
	const err = `${error.method} ${error.url} ${error.ip} ${error.message} ${error.erro} ${   JSON.stringify(req)  }`;
	// console.error('||  error', err);
	throw new Error(err);
});
