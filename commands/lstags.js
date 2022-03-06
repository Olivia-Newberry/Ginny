exports.run = async (client, message, args, level) => {
  const rows = await client.allSQL('SELECT tag FROM tags');
  if(Array.isArray(rows)){
    var tags = '';
    rows.forEach(element => {
      tags += element.tag+"\n";
    })
    message.channel.send("I know the following game tags:\n>>> "+tags);
  }else{
    var tags = 'I couldn\'t find any valid tags.';
    message.channel.send(tags);
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
}

exports.help = {
  name: "lstags",
  category: "Miscellaneous",
  description: "Lists all the tags I know.",
  usage: "lstags"
}
