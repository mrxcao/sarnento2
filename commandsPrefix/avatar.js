const usersCtl = require('../DB/mongo/controllers/users');

module.exports = async (client, msg) => {
	const usrs = await usersCtl.index();
	let text = '';
	const t = [];
	for (const u of usrs) {
		text = text + u.avatar + ' ';
		if (u.avatar) {
			t.push({
				attachment: u.avatar,
				// name: u.username,
			});
		}
	}
	msg.channel.send({
		files: t,
		content: 'avatares mil',
	});

	/*
	msg.reply(msg.author.displayAvatarURL());
	msg.reply(msg.author.avatarURL({ dynamic:true }));
	*/
};