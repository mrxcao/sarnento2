const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '.env'),
});
const schedule = require('node-schedule');
const tasklist = require('./tasks');
const mongodb = require('./modules/DB/mongo/connect');

function stringifyLimited(obj, maxLen = 80) {
  const str = JSON.stringify(obj);
  return str.length > maxLen ? `${str.substring(0, maxLen)}...` : str;
}

const run = async () => {
  await mongodb.connect();
  // eslint-disable-next-line no-restricted-syntax
  for (const task of tasklist) {
    schedule.scheduleJob(task.schedule, task.callback);
    // console.log(c, task.name, task.schedule);
  }
  console.table(tasklist.map((t) => ({
    name: t.name,
    schedule: stringifyLimited(t.schedule),
  })));

  console.log('Waiting for new taks  - ', process.env.NODE_ENV);
};

run();
