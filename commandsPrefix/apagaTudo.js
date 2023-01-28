module.exports = async (client, msg) => {
	try {
		const channel = msg.channel;
		const FetchMsg = await channel.messages.fetch({ })
			.catch(console.error);

		for (const m of FetchMsg) {
			// console.log('FetchMsg', m);
			try {
				await channel.bulkDelete([m[0]]);
			}
			catch (error) {
				console.log('tolerant error ', error);
			}
		}
		// await channel.bulkDelete(FetchMsg);
		msg.reply(`Apagou ${FetchMsg.size} menssagens`);
	}
	catch (error) {
		msg.reply('Essa budega tá bugada!');
		console.log('apagatudo error', error);
	}

};