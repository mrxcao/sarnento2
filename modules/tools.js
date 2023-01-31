const moment = require('moment');
moment.locale('pt-br');

const clog = (msg) => {
	console.log(moment().format('DD/MM/YYYY HH:mm:ss'), msg);
};
const replyLines = (times = 50, charR = '-') => {
	console.log(`${charR.repeat(times)}`);
};
const beep = () => {

};
module.exports = { clog, replyLines, beep };