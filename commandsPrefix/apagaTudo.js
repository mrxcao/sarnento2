module.exports = async (client, msg) => {
	try {
		const channel = msg.channel;
		const FetchMsg = await channel.messages.fetch({ limit: 100 })
			.catch(console.error);

		for (const m of FetchMsg) {
			// console.log('FetchMsg', m);
			try {
				channel.bulkDelete([m[0]]);
			}
			catch (error) {
				console.log('tolerant error ', error);
			}
		}
		// await channel.bulkDelete(FetchMsg);
		msg.reply(`tentando apagar ${FetchMsg.size} menssagens mas sei lá, as vezes não apaga`);
	}
	catch (error) {
		msg.reply('Essa budega tá bugada!');
		console.log('apagatudo error', error);
	}

};