const loterias = require('../modules/loterias');

const name = 'megaSena';
const debugMode = process.env.DEBUG === 'true' ? true : false;

module.exports = {
  name,
  schedule: {
    hour: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20, 21, 22],
    minute: [0],
    dayOfWeek: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  callback: async () => {
    console.log('debugMode',process.env.DEBUG, debugMode);
    console.log(new Date(), name, 'inicio');
    await loterias.capturarMegaSena(false, debugMode);
    console.log(new Date(), name, 'fim');
  },
};
