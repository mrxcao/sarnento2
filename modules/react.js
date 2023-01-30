// const wordReact = require("./database/dataModel/wordReact");
// const log = require("./database/log");


const say = (args, msg) => {
	const arr = [{ chave:'cachorro', 'value':'AU AU!' }];
	for (const w of arr) {
		if (args.find(e => e.toLowerCase() == w.chave.toLowerCase() ||
    String(e.toLowerCase()).indexOf(w.chave.toLowerCase()) > -1)) {
			msg.reply(w.value);
			//			log("react", msg);
		}
	}
};
module.exports = { say };