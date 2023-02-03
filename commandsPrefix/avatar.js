const usersCtl = require('../DB/mongo/controllers/users');

module.exports = async (client, msg) => {
	// msg.reply(msg.author.displayAvatarURL());
	// msg.channel.send( msg.author.displayAvatarURL() );
	const usrs = await usersCtl.index();

	let text = '';

	for (const u of usrs) {
		text = text + 'https://cdn.discordapp.com/avatars/217299114843439115/5d057b7075eee92dd985f6e6d5dca0d3.web' + u.avatar + ' ';
		console.log('u', u.avatar);
	}

	console.log('usrs', text);
	console.log('msg.author.displayAvatarURL()', msg.author.displayAvatarURL());
	msg.reply(text + ' ');
	msg.reply(msg.author.displayAvatarURL());
	msg.reply(msg.author.avatarURL({ dynamic:true }));
};