const {
	Client,
	GatewayIntentBits,
	EmbedBuilder,
	ActivityType,
} = require("discord.js");

module.exports.run = async (inter) => {
	const embed2 = new EmbedBuilder()
		.setAuthor({
			name: "Order a Product",
			iconURL:
				"https://cdn.discordapp.com/attachments/1111651214241837109/1119737777400057896/S_Logo_transp.png",
		})
		.setColor("#ff9500")
		.setTitle("S - Service | by ShxtOn")

		.addFields(
			{
				name: "FiveM Design",
				value: `➭ Logo ohne Animation | 2-5€
				➭ Logo mit Animation | 5-10€
				➭ Banner ohne Animation | 2-5€
				➭ Banner mit Animation | 5-10€
				➭ Tastaturbelegung | 5-10€
				➭ ID-Cards | 5-10€
				➭ Cinematics (Car Pxrn´s etc.) | 15-25€
				➭ FiveM Clothes | Individuell`,
			},
			{
				name: "Other - Design",
				value: `➭ Thumbnail | 5-10€
				➭ Header / Banner | 5-10€
				➭ Stream Pack ohne Animation | 15€
				➭ Stream Pack mit Animation | 20€`,
			},
			{
				name: "Edits",
				value: `➭ Fraktion Edit | 10-20€
				➭ Reallife Edit | 15-25€
				➭ Overedits | 15-30€
				➭ Normal Edits | 10-20€`,
			},
			{
				name: "FiveM Scripts",
				value: `➭ Individuell`,
			}
		)

		.setThumbnail(
			"https://cdn.discordapp.com/attachments/1111651214241837109/1111651488436076604/S_Logo_3.png"
		)
		.setTimestamp()
		.setFooter({
			text: "S-Service",
			iconURL:
				"https://cdn.discordapp.com/attachments/1111651214241837109/1111651488436076604/S_Logo_3.png",
		});
	return await inter.reply({ embeds: [embed2], ephemeral: true });
};

module.exports.help = {
	name: "prices",
	memberPermissions: [],
};
