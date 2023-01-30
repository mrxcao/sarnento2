const mongoose = require('mongoose');

const connect = async function() {
	try {
		const regex = new RegExp('(//([^:])*:)', 'g');
		const cntString = process.env.MONGO;
		await mongoose.connect(cntString);
		const usr = regex.exec(cntString);
		console.log(`   MongoDB conectado usr: ${ usr[0].substring(2, usr[0].length - 1) } `);
	}
	catch (error) {
		console.log('   connect error', error);
	}


	// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};

module.exports = { connect };