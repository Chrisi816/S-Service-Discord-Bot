const discord = require("discord.js");
const {
	Client,
	GatewayIntentBits,
	EmbedBuilder,
	ActivityType,
	PermissionBitField,
	ChannelType,
	ActionRowBuilder,
	SelectMenuBuilder,
	SlashCommandBuilder,
} = require("discord.js");
const { token } = require("./config.json");
const fs = require("fs");
const keep_alive = require("./keep_alive.js");

const client = new discord.Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
	],
	allowedMentions: { parse: ["users", "roles"], repliedUser: true },
});

client.aliases = new discord.Collection();
client.commands = new discord.Collection();
client.events = new discord.Collection();
client.SlashCmds = new discord.Collection();

module.exports.Client = client;

require("dotenv").config();

const { REST, Routes } = require("discord.js");
const commands = [
	{
		name: "prices",
		description: "Get the Prices",
	},
	{
		name: "ticket-set",
		description: "This is a cool System",
	},
];

const rest = new REST({ version: "10" }).setToken("");

(async () => {
	try {
		console.log("starting");
		await rest.put(
			Routes.applicationGuildCommands(
				"1119731413034479706",
				"967159072740761600"
			),
			{ body: commands }
		);
		console.log("ending");
	} catch (error) {
		console.log(`There was an error ${error}`);
	}
})();

client.on("messageCreate", async (message) => {
	if (!message.guild || message.author.bot) return;
	if (message.content === "!Keys") {
		const embed2 = new EmbedBuilder()
			.setAuthor({
				name: "Order a Product",
				iconURL:
					"https://cdn.discordapp.com/attachments/1111651214241837109/1119737777400057896/S_Logo_transp.png",
			})
			.setColor("#ff9500")
			.setTitle("S - Gangwar")

			.addFields(
				{
					name: "__Description:__",
					value: ">>>",
				},
				{
					name: "__Features:__",
					value: ">>>",
				},
				{
					name: "__Requirements:__",
					value: ">>> - es_extended 1.1 / 1.2 / Legacy",
				},
				{
					name: "__Demo:__",
					value: ">>>",
				},
				{
					name: "__Information:__",
					value: ">>>",
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
		message.channel.send({ embeds: [embed2] });
	}
});

fs.readdirSync("./commands/").forEach((dir) => {
	fs.readdir(`./commands/${dir}`, (err, files) => {
		if (err) throw err;

		var jsFiles = files.filter((f) => f.split(".").pop() === "js");

		if (jsFiles.length <= 0) {
			console.log("[COMMANDHANDLER] - Can't find any commands!");
			return;
		}

		jsFiles.forEach((file) => {
			var fileGet = require(`./commands/${dir}/${file}`);
			console.log(`[COMMANDHANDLER] - File ${file} was loaded`);

			try {
				client.commands.set(fileGet.help.name, fileGet);
				fileGet.help.aliases.forEach((alias) => {
					client.aliases.set(alias, fileGet.help.name);
				});
			} catch (err) {
				return console.log(err);
			}
		});
	});
});
fs.readdirSync("./events/").forEach((dir) => {
	var jsFiles = fs
		.readdirSync("./events/")
		.filter((f) => f.split(".").pop() === "js");
	let check = false;
	if (jsFiles.length <= 0) {
		console.log("[EVENTDHANDLER] - Can't find any events!");
		return;
	}

	jsFiles.forEach((event) => {
		const eventget = require(`./events/${event}`);

		try {
			client.events.set(eventget.name, eventget);
			if (check == false)
				console.log(`[EVENTDHANDLER] - File ${event} was loaded`);
			check = true;
		} catch (error) {
			return console.log(error);
		}
	});
});

fs.readdirSync("./SlashCommands/").forEach((dir) => {
	fs.readdir(`./SlashCommands/${dir}`, (err, files) => {
		if (err) throw err;

		var jsFiles = files.filter((f) => f.split(".").pop() === "js");

		if (jsFiles.length <= 0) {
			return console.log("[SLASHHANDLER] - Can't find any commands!");
		}

		jsFiles.forEach((file) => {
			var fileGet = require(`./SlashCommands/${dir}/${file}`);
			console.log(`[SLASHHANDLER] - File ${file} was loaded`);

			try {
				client.SlashCmds.set(fileGet.help.name, fileGet);
			} catch (err) {
				return console.log(err);
			}
		});
	});
});

client.login(token);
