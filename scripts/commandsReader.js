const fs = require('fs');
const dir = './commandsPrefix/';

module.exports = (prefix) => {
	const commands = {};
	const scripts = fs.readdirSync(dir);
	scripts.forEach(script => {
		commands[prefix + String(script.split('.')[0]).toLowerCase() ] = require('../' + dir + script);
	});
	return commands;
};