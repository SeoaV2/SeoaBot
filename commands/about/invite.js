const { MessageEmbed } = require('discord.js')

/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  const embed = new MessageEmbed({
    thumbnail: client.user.avatarURL(),
    title: locale('about.invite'),
    url: 'https://discord.com/oauth2/authorize?client_id=' + client.user.id + '&permissions=0&scope=bot',
    color: 0xff5ae5
  }).setThumbnail(client.user.avatarURL())
  msg.channel.send(embed)
}

module.exports = fn
module.exports.aliases = ['invite', '초대']
