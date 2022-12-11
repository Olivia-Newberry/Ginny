exports.run = (client, message, args) => {
  client.destroy();
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Admin"
};

exports.help = {
  name: "restart-ginny",
  category: "Admin",
  description: "Restarts the bot.",
  usage: "restart-ginny"
};
