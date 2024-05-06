if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const tools = require('../modules/tools.js');
const loaders = require('../classes/Loaders.js');
const pack = require('../package.json');

tools.replyLines();
loaders.init(2).then(() => {
	console.log(`Pronto! API ${pack.name} ver:${pack.version}  ${process.env.NODE_ENV} `);
	tools.replyLines();
});
