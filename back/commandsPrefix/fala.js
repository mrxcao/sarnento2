
module.exports = async (client, msg) => {    
    let message = msg.content.split(' ');
    let canal = message[1]    
    canal = canal.replace(/\D/gim, '');
    message.splice (0,2)
    message = message.join(' ');
    console.log('canal 724421701127110696 - ',canal)
    console.log('message ',message)

    //let falaChannel = await msg.guild.channels.find(channel=>channel.id == config.falaChannel)
    //let falaChannel = await msg.guild.channels.find(channel=>channel.id == canal)
    console.log(msg.guild.channels)
    const avisoChannel = await msg.guild.channels.find(channel=>channel.id == canal);
    await avisoChannel.send(`@everyone ${message}`);
    
}