/**
 * @param {import('../../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  if (!msg.guild) return msg.channel.send(locale('music.global.nodm'))
  const player = client.lavalink.players.get(msg.guild.id)
  player.stop()
  msg.channel.send(locale('music.stop'))
  client.lavalink.leave(msg.guild.id)
}

module.exports = fn
module.exports.aliases = ['stop']
