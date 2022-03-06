exports.run = async (client, message, args, level) => {
const { MessageEmbed } = require("discord.js")
var nickName = await message.member.displayName || message.author.username;


  const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle(nickName)
    .setDescription('bio here?')
    .setThumbnail(message.author.avatarURL())
    .addField('Tags','List of tags')
    .setFooter('London Gaymers - www.londongaymers.co.uk',message.guild.iconURL())
  message.channel.send({embeds: [embed]});
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
}

exports.help = {
  name: "profile",
  category: "Miscellaneous",
  description: "Shows your profile, or that of a specified user.",
  usage: "profile [user]"
}
