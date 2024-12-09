const Client = require("../index").Client;
const { ActivityType } = require("discord.js");

const { createCmd, acCmd } = require("../dataHandler");
Client.on("ready", async () => {
	Client.user.setActivity({
		name: "S-Service | by ShxtOn",
		type: ActivityType.Streaming,
		url: "https://discord.gg/b7GtXEMxVS",
	});
	console.log(`${Client.user.tag} is Online`);
	createCmd(Client, null);
});
