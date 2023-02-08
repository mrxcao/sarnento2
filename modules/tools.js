const moment = require('moment');
moment.locale('pt-br');

const clog = (msg, plus = '', plus2 = '', plus3 = '') => {
	console.log(moment().format('DD/MM/YYYY HH:mm:ss'), msg, plus, plus2, plus3);
};
const replyLines = (times = 50, charR = '-') => {
	console.log(`${charR.repeat(times)}`);
};
const beep = () => {
	// n dei conta
};
module.exports = { clog, replyLines, beep };