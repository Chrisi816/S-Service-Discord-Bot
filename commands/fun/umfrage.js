
const { MessageEmbed } = require('discord.js');

module.exports.run = async (Client, message, args, prefix) => {
    const channel = message.guild.channels.cache.find(c => c.name === "╠═📣-umfragen")
    let messageargs = args.join(' ')
    if(!channel) return message.channel.send("Es gibt keinen Umfrage Channel")
    
    if(!messageargs) return message.channel.send("Du musst eine Umfrage äußern")
   
    const embed = new MessageEmbed()
    .setColor("GREEN")
    .setTitle(`Umfrage von: ${message.author.tag}`)
    .setDescription('```' + messageargs + "```")
    .addField('Diese Umfrage wurde von', `${message.author.tag} geäußert`, true)
    .setFooter("Noxans_Wünsche");
    channel.send({embeds: [embed]}).then((msg) => {
        msg.react("🅰")
        msg.react("🅱")
        message.delete()
    }).catch((err) => {
        throw err
    })
}
module.exports.help = {
    name: "umfrage", 
    aliases: ["u"]
}
