const delay = async (sec) => new Promise((resolve) => {
  // console.log('aqui');
  setTimeout(resolve, sec * 1000);
});

const nowBR = () => new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

module.exports = {
  delay,
  nowBR,
};
