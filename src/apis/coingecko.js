const axios = require('axios');
const tools = require('../../modules/tools');
const url = 'https://api.coingecko.com/api/v3/simple/price?';


const bitcoin = async () => {
	const response = await axios({ method: 'get',	url: url + 'ids=bitcoin&vs_currencies=usd,brl' });
	const text = `Atualmente, o bitcoin custa  **US$ ${ await tools.formatarMoeda(response.data.bitcoin.usd, 'USD')}**  ou **R$ ${ await tools.formatarMoeda(response.data.bitcoin.brl, 'BRL')}**  `;
	return text;
};

const dolar = async () => {
	const response = await axios({ method: 'get',	url: url + 'ids=usd&vs_currencies=brl' });
	const text = `Atualmente, o dólar está **R$ ${ await tools.formatarMoeda(response.data.usd.brl)}**  `;
	return text;
};

module.exports = { bitcoin, dolar };
