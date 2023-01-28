module.exports = async (client, msg) => {
	try {
		const channel = msg.channel;
		const FetchMsg = await channel.messages.fetch('', -1)
			.catch(console.error);
		/*
		for (const m of FetchMsg) {
			await channel.bulkDelete([m]);
		}
        */
		console.log('FetchMsg', FetchMsg);
		await channel.bulkDelete(FetchMsg);

		msg.reply(`Apagou ${FetchMsg.size} menssagens`);
	}
	catch (error) {
		msg.reply('Só dá pra apagar mensagens de 15 dias pra cá');
		console.log('apagatudo error', error);
	}

};