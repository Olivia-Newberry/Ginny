exports.run = async (client, message, args) => {
    message.channel.send(`🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
    const reply = await message.reply("Ping?");
    await reply.edit(`Pong! Latency is ${reply.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms.`);
}
