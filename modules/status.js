const guildsCtrl = require('../DB/mongo/controllers/guilds');
const usersCtrl = require('../DB/mongo/controllers/users');
const momemt = require('moment');

const data1 = new momemt(new Date());

const get = async (outType = 1) => {
	const data2 = new momemt(new Date());

	const diferencaEmDias = data2.diff(data1, 'days');
	const diferencaEmHoras = data2.diff(data1, 'hours') - (24 * diferencaEmDias);
	const diferencaEmMinutos = data2.diff(data1, 'minutes') - (60 * diferencaEmHoras);


	const gildCount = await guildsCtrl.getMax();
	const usersCount = await usersCtrl.getMax();
	const uptime = `${diferencaEmDias} dias, ${ diferencaEmHoras} hora, ${diferencaEmMinutos} minutos `;
	switch (outType) {
	case 0: // markDown
		return '**STATUS** \n\n' +
        `STATUS: ok
		uptime: ${uptime}
        Users: ${usersCount}
        Servers: ${gildCount}`;
		break;
	case 1: // JSON
		return {
			STATUS: 'ok',
			uptime,
			Users: usersCount,
			Servers: gildCount,
		};
		break;
	default:
		return false;
		break;
	}

};

module.exports = { get };