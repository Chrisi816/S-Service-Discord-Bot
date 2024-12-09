const Client = require("../index").Client
const { guildMember, EmbedBuilder } = require("discord.js")
Client.on("guildMemberAdd", async guildMember => {
  const channel = Client.channels.cache.get("866733474986459156").send({
    embeds: [
      new EmbedBuilder()
        .setColor("#ff00bf")
        .setAuthor({ name: "Neuer Member" })
        .setDescription(`**<@${guildMember.user.id}> ist dem Server beigetreten**`)
        .setThumbnail("https://cdn.discordapp.com/attachments/858761371582464021/931587238150680666/big.png")
        .setFooter({ text: "Noxans_Welcome" })
    ]
  })
})