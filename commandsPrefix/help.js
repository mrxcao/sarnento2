const commands = require('../scripts/commandsReader')('!');

module.exports = (client, msg) => {
    const comd =  String(Object.keys(commands)).split(',')
    msg.reply('Lista de comandos: \n'+ comd );
}