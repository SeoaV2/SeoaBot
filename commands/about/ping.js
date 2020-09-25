const { MessageEmbed } = require('discord.js')

/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  const embed = new MessageEmbed({ color: 0xff0000, title: locale('about.ping.testing') })
  const m = await msg.channel.send(embed)
  const ping = Math.floor((m.createdTimestamp - msg.createdTimestamp) * 100) / 100
  embed
    .setColor(0xff5ae5)
    .setTitle(locale('about.ping.success'))
    .setDescription(locale('about.ping.status', client.ws.ping, ping))
  m.edit(embed)
}

module.exports = fn
module.exports.aliases = ['ping', '핑', 'pong']
