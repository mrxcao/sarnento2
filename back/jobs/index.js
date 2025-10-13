const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '.env'),
});
const schedule = require('node-schedule');
const tasklist = require('./tasks');
const mongodb = require('./modules/DB/mongo/connect');
const debugMode = process.env.DEBUG === 'true' ? true : false;

const run = async () => {
  /*
  if (!mongo.isConnected()) {
    mongo.connect();
  }
  */
  await mongodb.connect();
  let c = 1;
  // eslint-disable-next-line no-restricted-syntax
  for (const task of tasklist) {
    schedule.scheduleJob(task.schedule, task.callback);
    console.log(c, task.name);
    c += 1;
  }

  console.log('Waiting for new taks  - ', process.env.NODE_ENV);
  if (debugMode) {
		console.log(':: Debug mode ON'); console.log('\x07'); // beep
	}
};

run();
