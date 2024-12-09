const {
	PermissionBitField,
	EmbedBuilder,
	ChannelType,
	ActionRowBuilder,
	SelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	SlashCommandBuilder,
} = require("discord.js");

module.exports.run = async (interaction) => {
	const embed = new EmbedBuilder()
		.setColor("#ff9500")
		.setTitle("Ticket System")
		.setDescription(`Wenn du ein Problem hast, mache ein Ticket auf`)
		.setFooter({
			text: "S-Service",
			iconURL:
				"https://cdn.discordapp.com/attachments/1111651214241837109/1111651488436076604/S_Logo_3.png",
		});
	const menu = new ActionRowBuilder().addComponents(
		new SelectMenuBuilder()
			.setCustomId("select")
			.setMaxValues(1)
			.setPlaceholder(`Wähle was aus`)
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel("General Support")
					.setDescription("The dual-type Grass/Poison Seed Pokémon.")
					.setValue("bulbasaur"),
				new StringSelectMenuOptionBuilder()
					.setLabel("Moderation Support")
					.setDescription("The Fire-type Lizard Pokémon.")
					.setValue("charmander"),
				new StringSelectMenuOptionBuilder()
					.setLabel("Nigeria Support")
					.setDescription("The Water-type Tiny Turtle Pokémon.")
					.setValue("squirtle")
			)
	);
	return await interaction.channel.send({
		embeds: [embed],
		components: [menu],
	});
};

module.exports.help = {
	name: "ticket-set",
	memberPermissions: [],
};
