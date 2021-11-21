exports.run = async (client, message, args) => {
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
