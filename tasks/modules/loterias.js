const https = require('https');
const puppeteer = require('puppeteer');
const axios = require('axios');
const megasenaCtrl = require('./DB/mongo/controllers/megasena');
// eslint-disable-next-line no-unused-vars
const tools = require('./tools');

const debugMode = process.env.NODE_ENV == 'development';
/*
const config = {
  // executablePath: '/usr/bin/chromium-browser',
  // executablePath: '/usr/bin/chromium',
  headless: true, // true
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
};
*/
const config = {
  headless: !debugMode,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
};

const pegaQuantidade = (t, iniciaEm) => {
  let res = '';
  let c = 1;
  while (iniciaEm + c <= t.length) {
    const trecho = t.substring(iniciaEm, iniciaEm + c).trim();
    // para quando o trecho deixa de ser um número (ou está vazio / só espaços)
    // eslint-disable-next-line no-restricted-globals
    if (trecho === '' || isNaN(trecho)) break;
    res = trecho;
    c++;
  }
  return res.trim();
};

const wait = async () => {
  // await page.waitForTimeout(3000); // Espera um pouco antes de pegar o HTML
  await tools.delay(debugMode ? 0.1 : 5);
  // const pageContent = await page.content();
  // console.log(pageContent);
};
const usarScrap = async (concurso_ = null) => {
  let c = 0;
  const browser = await puppeteer.launch(config);
  const [page] = await browser.pages();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
  await page.setExtraHTTPHeaders({
    Referer: 'https://loterias.caixa.gov.br/Paginas/Mega-Sena.aspx',
    Cookie: 'security=true',
  });

  await page.goto('https://loterias.caixa.gov.br/Paginas/Mega-Sena.aspx');
  // const textSelector = await page.$$('.resultado-loteria');

  let text = null;
  let concurso = null;

  await wait();
  await page.waitForSelector('#wp_resultados > div.content-section.section-text.with-box.no-margin-bottom > div > h2 > span', { timeout: 10000 });
  text = await page.$eval(
    '#wp_resultados > div.content-section.section-text.with-box.no-margin-bottom > div > h2 > span',
    (el) => el.textContent.trim(),
  );
  concurso = parseInt(text.substring(9, 13).trim());
  if (concurso_) {
    // await page.type('#buscaConcurso', concurso_);
    while (concurso != concurso_) {
      console.log('buscando ... ', concurso, concurso_);
      await page.click('#wp_resultados > div.content-section.section-text.with-box.no-margin-bottom > div > div.nav-results > ul > li:nth-child(2) > a');
      await tools.delay(2);
      text = await page.$eval(
        '#wp_resultados > div.content-section.section-text.with-box.no-margin-bottom > div > h2 > span',
        (el) => el.textContent.trim(),
      );
      concurso = parseInt(text.substring(9, 13).trim());
    }
  }
  console.log(5);
  const data = text.substring(15, 25);
  console.log(6);
  let acumulou = false;
  const acumulouSel = await page.$$('[ng-show="resultado.acumulado"]');
  for (const sel of acumulouSel) {
    const t = await sel?.evaluate((el) => el.textContent);
    acumulou = t.trim() === 'Acumulou!';
  }
  console.log(7);
  let local = 1;
  const localSel = await page.$$('#wp_resultados > div.content-section.section-text.with-box.column-left.no-margin-top > div > div > p');
  c = 0;
  for (const sel of localSel) {
    const t = await sel?.evaluate((el) => el.textContent);
    local = t.trim().substring(21, 60).trim();
  }
  console.log(8);
  const dezenas = [];
  const dezenasSel = await page.$$('#ulDezenas');
  c = 0;
  for (const sel of dezenasSel) {
    let t = await sel?.evaluate((el) => el.textContent);
    t = t.trim();
    dezenas.push(t.substring(0, 2));
    dezenas.push(t.substring(2, 4));
    dezenas.push(t.substring(4, 6));
    dezenas.push(t.substring(6, 8));
    dezenas.push(t.substring(8, 10));
    dezenas.push(t.substring(10, 12));
  }

  const premiacoes = [];
  const premiacaoSel = await page.$$('#wp_resultados > div.content-section.section-text.with-box.column-right.no-margin-top > div > p');
  c = 0;

  for (const sel of premiacaoSel) {
    let t = await sel?.evaluate((el) => el.textContent);
    t = t.trim();
    let acertos;
    if (c === 0 || c === 1 || c === 2) {
      switch (c) {
        case 0:
          acertos = 'Sena';
          break;
        case 1:
          acertos = 'Quina';
          break;
        case 2:
          acertos = 'Quadra';
          break;
        default:
          break;
      }

      const vencedores = Number(pegaQuantidade(t, 34).replace('.', ''));
      let premio = t.substring(t.indexOf('R$') + 3, t.indexOf('R$') + 25).replace('\n', '').trim();

      if (premio === '0,00') { premio = '-'; }

      premiacoes.push({ acertos, vencedores, premio });
    }
    c++;
  }

  let acumuladaProxConcurso = null;
  const acumuladaProxConcursoSel = await page.$$('#wp_resultados > div.content-section.section-text.with-box.column-left.no-margin-top > div > div > div.next-prize.clearfix > p.value.ng-binding');
  c = 0;
  for (const sel of acumuladaProxConcursoSel) {
    const t = await sel?.evaluate((el) => el.textContent);
    acumuladaProxConcurso = t.trim();
  }

  let dataProxConcurso = null;
  const dataProxConcursoSel = await page.$$('#wp_resultados > div.content-section.section-text.with-box.column-left.no-margin-top > div > div > div.next-prize.clearfix > p:nth-child(1)');
  c = 0;
  for (const sel of dataProxConcursoSel) {
    const t = await sel?.evaluate((el) => el.textContent);
    dataProxConcurso = t.trim().substring(41, 52);
  }

  const req = {
    concurso,
    data,
    local,
    dezenas,
    premiacoes,
    estadosPremiados: [],
    acumulou,
    acumuladaProxConcurso,
    dataProxConcurso,
    proxConcurso: concurso + 1,
    timeCoracao: null,
    mesSorte: null,
  };

  // await page.waitForNavigation();
  // console.log('req', req);
  await browser.close();
  // return true;
  const res = await megasenaCtrl.upSert(req);
  // debugMode ? console.log('res', res) : true;
  return res;
};

const MAPA_FAIXA = { 1: 'Sena', 2: 'Quina', 3: 'Quadra' };

const nomeAcertos = (prem, indice) => {
  if (MAPA_FAIXA[prem.faixa]) return MAPA_FAIXA[prem.faixa];
  const d = String(prem.descricaoFaixa || '').toLowerCase();
  if (d.includes('sena') || d.startsWith('6')) return 'Sena';
  if (d.includes('quina') || d.startsWith('5')) return 'Quina';
  if (d.includes('quadra') || d.startsWith('4')) return 'Quadra';
  return ['Sena', 'Quina', 'Quadra'][indice] || null;
};

// formata um numero para o padrao BR "1.234.567,89" (formato que o upSert espera desmontar)
const formataBR = (valor) => Number(valor || 0).toLocaleString('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// A servicebus2 da Caixa tem cadeia de certificado incompleta em alguns ambientes
// e recusa requisicoes sem User-Agent de navegador.
const caixaAgent = new https.Agent({ rejectUnauthorized: false });
const CAIXA_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept: 'application/json',
};

// Mesma finalidade de usarScrap, porem consumindo a API oficial da Caixa em vez do Puppeteer.
const usarAPI = async (concurso_ = null) => {
  const url = `https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena${concurso_ ? `/${concurso_}` : ''}`;
  const response = await axios({
    method: 'get',
    url,
    headers: CAIXA_HEADERS,
    httpsAgent: caixaAgent,
    timeout: 30000,
  });
  const { data } = response;
  // if (debugMode) console.log('data', data)

  const premiacoes = (data.listaRateioPremio || [])
    .map((prem, i) => ({
      acertos: nomeAcertos(prem, i),
      vencedores: Number(prem.numeroDeGanhadores) || 0,
      premio: prem.valorPremio ? formataBR(prem.valorPremio) : '-',
    }))
    .filter((prem) => ['Sena', 'Quina', 'Quadra'].includes(prem.acertos));

  const estadosPremiados = (data.listaMunicipioUFGanhadores || []).map((g) => ({
    uf: g.uf,
    municipio: g.municipio,
    ganhadores: g.ganhadores,
  }));

  const valorProxConcurso = data.valorEstimadoProximoConcurso
    || data.valorAcumuladoProximoConcurso
    || 0;

  const local = [data.localSorteio, data.nomeMunicipioUFSorteio]
    .filter(Boolean)
    .join(' em ')
    .trim();

  const req = {
    concurso: data.numero,
    data: data.dataApuracao,
    local,
    dezenas: data.listaDezenas || data.dezenasSorteadasOrdemSorteio || [],
    premiacoes,
    estadosPremiados,
    acumulou: Boolean(data.acumulado),
    acumuladaProxConcurso: valorProxConcurso ? `R$ ${formataBR(valorProxConcurso)}` : null,
    dataProxConcurso: data.dataProximoConcurso || null,
    proxConcurso: data.numeroConcursoProximo || data.numero + 1,
    timeCoracao: null,
    mesSorte: null,
  };

  const res = await megasenaCtrl.upSert(req);
  return res;
};

const primeiraCarga = async () => {
  const url = 'https://loteriascaixa-api.herokuapp.com/api/mega-sena/';
  const concursoAtual = 2617;
  for (let n = 1; n <= concursoAtual; n++) {
    const header = {
      method: 'get',
      url: url + n,
    };
    const response = await axios(header);
    const { data } = response;
    debugMode ? console.log('data', data.data) : true;
    await megasenaCtrl.upSert(data);
  }
  return true;
};
const prcouraBuraco = async () => {
  const NaoExistem = [2796];
  if (debugMode) console.log('🪏 prcouraBuraco');
  const data = await megasenaCtrl.prcouraBuraco();
  if (data) {
    let concursoEsperado = data[0].concurso;
    for (const d of data) {
      const concursoAtual = d.concurso;
      // if (debugMode) console.log('🏷️ concursoAtual', concursoAtual, 'concursoEsperado', concursoEsperado);
      if (concursoAtual != concursoEsperado && !NaoExistem.includes(concursoEsperado)) {
        if (debugMode) console.log('🏷️ concursoAtual', concursoAtual, 'concursoEsperado', concursoEsperado);
        await usarAPI(concursoEsperado);
      }
      concursoEsperado -= 1;
      while (NaoExistem.includes(concursoEsperado)) {
        concursoEsperado -= 1;
      }
    }
  }
  if (debugMode) console.log('🪏 NaoExistem', NaoExistem);
};

// Task agendada: busca e atualiza apenas o ultimo resultado.
const capturarMegaSena = async (buraco) => {
  await usarAPI();
  if (buraco) {
    await prcouraBuraco();
  }
};

// Backfill de concursos faltantes. NAO roda na task agendada - chamar manualmente
// (ex.: node run.js megasena) quando precisar preencher buracos no banco.
const preencherBuracos = async () => {
  await prcouraBuraco();
};

module.exports = {
  capturarMegaSena, preencherBuracos, primeiraCarga, usarAPI, usarScrap,
};
