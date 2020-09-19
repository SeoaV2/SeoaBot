const { MessageEmbed } = require('discord.js')

/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg) {
  const embed = new MessageEmbed({ color: 0xff0000, title: client.i18n.__({ phrase: 'about.ping.testing', locale: msg.author.locale }) })
  const m = await msg.channel.send(embed)
  const ping = Math.floor((m.createdTimestamp - msg.createdTimestamp) * 100) / 100
  embed
    .setColor(0xff5ae5)
    .setTitle(client.i18n.__({ phrase: 'about.ping.success', locale: msg.author.locale }))
    .setDescription(client.i18n.__({ phrase: 'about.ping.status', locale: msg.author.locale }, client.ws.ping, ping))
  m.edit(embed)
}

module.exports = fn
module.exports.aliases = ['ping', '핑', 'pong']
