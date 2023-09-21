const logActionClt = require('../DB/mongo/controllers/logAction');

const action = (msg, ai, prompt, resposta) => {
	const data = {
		prompt,
		resposta,
		ai,
		guild: {
			id: msg.guildId,
			name: msg.guild.name,
		},
		user: {
			id: msg.author.id,
			username: msg.author.username,
		},
	};
	logActionClt.store(data);
};

module.exports = { action };