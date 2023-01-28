const fs = require('fs');
const dir = './commandsPrefix/';

module.exports = (prefix) => {
	console.log('1', 1);
	const commands = {};
	const scripts = fs.readdirSync(dir);
	scripts.forEach(script => {
		commands[prefix + String(script.split('.')[0]).toLowerCase() ] = require('../' + dir + script);
	});
	console.log('commands', commands);
	return commands;
};