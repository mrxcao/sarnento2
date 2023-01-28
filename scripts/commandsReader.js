const fs = require('fs');
const dir = './commands/';

module.exports = (prefix)=>{
    var commands = {};
    const scripts = fs.readdirSync(dir);
    scripts.forEach(script => {
        commands[prefix+String(script.split(".")[0]).toLowerCase() ] = require('../'+dir+script)
    });
    return commands;
} 