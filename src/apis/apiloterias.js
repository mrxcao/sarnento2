const axios = require('axios');

const url = process.env.LOTERIAS_URL;
const token = process.env.LOTERIAS_TOKEN;

const resultadoMegaSena = async () => {
	/*
	const header = {
		method: 'GET',
		url: url + 'resultado?loteria=MEGA-SENA&token=' + token,
	};
	const response = await axios(header);
	const data = response.data;
    */
	return 'A API é ruim, criando outra forma usando DB próprio';
};

module.exports = { resultadoMegaSena };
