
const { MessageEmbed } = require('discord.js');

module.exports.run = async (Client, message, args, prefix) => {
    const channel = message.guild.channels.cache.find(c => c.name === "╠═✨wünsche")
    let messageargs = args.join(' ')
    if(!channel) return message.channel.send("Es gibt keinen Wünsche Channel")
    
    if(!messageargs) return message.channel.send("Du musst einen Wunsch äußern")
   
    let text = "hey"
    const embed = new MessageEmbed()
    .setColor("GREEN")
    .setTitle(`Wunsch von: ${message.author.tag}`)
    .setDescription('```' + messageargs + "```")
    .addField('Dieser Wunsch wurde von', `${message.author.tag} geäußert`, true)
    .setFooter("Noxans_Wünsche");
    channel.send({embeds: [embed]}).then((msg) => {
        msg.react("👍")
        msg.react("👎")
        message.delete()
    }).catch((err) => {
        throw err
    })
}
module.exports.help = {
    name: "wunsch", 
    aliases: ["w"]
}