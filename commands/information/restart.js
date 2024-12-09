
const { MessageEmbed } = require('discord.js');

module.exports.run = async (Client, message, args, prefix) => {
   if (message.author.id == ["816076557336313856"]) {
    await message.channel.send("Bot Restartet...")
    process.exit()
   }
   return message.channel.send("Du hast nicht die Ausreichenden Rechte um diesen Command zu benutzen")
   
}
module.exports.help = {
    name: "restart", 
    aliases: ["res"]
}