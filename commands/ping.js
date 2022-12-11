exports.run = async (client, message, args, level) => {
    const reply = await message.reply("Ping?");
    await reply.edit(`Pong! Latency is ${reply.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms.`);
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
}

exports.help = {
    name: "ping",
    category: "Miscellaneous",
    description: "Pong!",
    usage: "ping"
}
