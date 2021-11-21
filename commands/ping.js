exports.run = (client, message, args) => {
    message.channel.send(`🏓Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
}
