module.exports = (client, msg) => {    
    msg.reply( msg.author.displayAvatarURL() );
    // msg.channel.send( msg.author.displayAvatarURL() );
}