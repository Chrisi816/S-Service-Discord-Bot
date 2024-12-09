const Client = require("../index").Client
const { EmbedBuilder } = require('discord.js')
Client.on("messageCreate", async message => {
  if (message.author.bot || message.channel.type == "DM") return

  let prefix = "!";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1)
  let commands = Client.commands.get(cmd.slice(prefix.length)) || Client.commands.get(Client.aliases.get(cmd.slice(prefix.length)));
  if (commands) {
    if (!message.content.startsWith(prefix)) return
    commands.run(Client, message, args, prefix);
  }


})
const isInvite = async (guild, code) => {
  return await new Promise((resolve) => {
    guild.invites.fetch().then((invites) => {
      for (const invite of invites) {
        if (code === invite[0]) {
          resolve(true)
          return
        }
      }
      resolve(false)
    })
  })
}

Client.on("messageCreate", async (message) => {
  const { guild, member, content } = message

  const code = content.split("discord.gg/")[1]

  if (content.includes("discord.gg/")) {
    const isOurInvite = await isInvite(guild, code)
    if (!isOurInvite) {
      message.member.roles.add("938529895347261501")
      message.member.roles.remove("866732036508614717")
      message.delete()
      const embed1 = new EmbedBuilder()
        .setColor("#ff00bf")
        .setAuthor({ name: "Noxans" })
        .setTitle("Link Gelöscht")
        .addFields({ name: `Warnung`, value: `${member} Bitte Poste keine Einladungen welche mit diesem Discord nichts zu tun haben. Du bekommst vorsichtshalber die MUTE rolle, und deine Bürger rolle wird entfernt` })
      return message.channel.send({ embeds: [embed1] });

    }
    return
  }
  if (content.includes("dsc.gg/")) {
    const isOurInvite = await isInvite(guild, code)
    if (!isOurInvite) {
      message.member.roles.add("938529895347261501")
      message.member.roles.remove("866732036508614717")
      message.delete()
      const embed1 = new EmbedBuilder()
        .setColor("#ff00bf")
        .setAuthor({ name: "Noxans" })
        .setTitle("Link Gelöscht")
        .addFields({ name: `Warnung`, value: `${member} Bitte Poste keine Einladungen welche mit diesem Discord nichts zu tun haben. Du bekommst vorsichtshalber die MUTE rolle, und deine Bürger rolle wird entfernt` })
      return message.channel.send({ embeds: [embed1] });
    }
    return
  }
  if (content.includes("@everyone") || content.includes("@here")) {
    const isOurInvite = await isInvite(guild, code)
    if (!isOurInvite) {
      message.member.roles.add("938529895347261501")
      message.member.roles.remove("866732036508614717")
      message.delete()
      const embed1 = new EmbedBuilder()
        .setColor("#ff00bf")
        .setAuthor({ name: "Noxans" })
        .setTitle("Mention gelöscht")
        .addFields({
          name: `Warnung`, value: `${member} @everyone Tag ist nicht erlaubt!`
        })
      return message.channel.send({ embeds: [embed1] });
    }
    return
  }
})