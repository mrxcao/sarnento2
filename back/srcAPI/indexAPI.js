if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const tools = require('../modules/tools.js');
const loaders = require('../classes/Loaders.js');
const pack = require('../package.json');
const debugMode = process.env.DEBUG === 'true' ? true : false;

tools.replyLines();
loaders.init(2).then(() => {
	console.log(`Pronto! API ${pack.name} ver:${pack.version}  ${process.env.NODE_ENV} `);
	tools.replyLines();
	if (debugMode) {
		console.log(':: Debug mode ON'); console.log('\x07'); // beep
	}
});
