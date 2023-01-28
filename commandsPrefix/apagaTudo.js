module.exports = async (client, msg) => {
    const channel = msg.channel;
    const FetchMsg = await channel.messages.fetch()
    .catch(console.error);
    await channel.bulkDelete(FetchMsg);
    msg.reply(`Apagou ${FetchMsg.size} menssagens`)
}