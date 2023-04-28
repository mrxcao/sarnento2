const axios = require('axios');

const url = 'https://api.coingecko.com/api/v3/simple/price?';


const bitcoin = async () => {
	const header = {
		method: 'get',
		url: url + 'ids=bitcoin&vs_currencies=usd',
	};
	const response = await axios(header);
	console.log('response', response);
	return response;
};

const dolar = async () => {
	const header = {
		method: 'get',
		url: url + 'ids=usd&vs_currencies=brl',
	};
	const response = await axios(header);
	console.log('response', response);
	return response;
};

module.exports = { bitcoin, dolar };
