const { performance } = require('perf_hooks');
const mod = require('../modules/ipca');
const { nowBR } = require('../modules/tools');

const name = 'atualizaIPCA';
module.exports = {
  name,
  schedule: { hour: [10], minute: [0], dayOfWeek: [0, 1, 2, 3, 4, 5, 6, 7] },
  callback: async () => {
    const debugMode = process.env.DEBUG === 'true';
    const t0 = performance.now();
    console.log(`[${nowBR()}] (${name}) Início`);
    await mod.capturarIPCA(debugMode);
    const t1 = performance.now();
    console.log(`[${nowBR()}] (${name}) Fim - ${(t1 - t0) / 1000}s`);
  },
};
