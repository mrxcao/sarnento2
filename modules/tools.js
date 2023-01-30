const moment = require('moment');

const clog = (msg) => {
	moment.locale('pt-br');
	console.log(moment().format('DD/MM/YYYY HH:mm:ss'), msg);
};
const replyLines = (times = 50, charR = '-') => {
	console.log(`${charR.repeat(times)}`);
};
module.exports = { clog, replyLines };