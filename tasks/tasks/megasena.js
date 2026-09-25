const { performance } = require('perf_hooks');
const loterias = require('../modules/loterias');
const { nowBR } = require('../modules/tools');

const name = 'megaSena';
const debugMode = process.env.DEBUG === 'true';

module.exports = {
  name,
  schedule: {
    hour: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 20, 21, 22],
    minute: [0],
    dayOfWeek: [0, 1, 2, 3, 4, 5, 6, 7],
  },
  callback: async () => {
    // const procurarBuracos = true;
    const t0 = performance.now();
    console.log(`[${nowBR()}] (${name}) Início`);
    await loterias.capturarMegaSena(true);
    /*
    if (procurarBuracos) {
      await loterias.prcouraBuraco(false, debugMode);
    }
*/
    const t1 = performance.now();
    console.log(`[${nowBR()}] (${name}) Fim - ${(t1 - t0) / 1000}s`);
  },
};
