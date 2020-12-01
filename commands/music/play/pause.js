/**
 * @param {import('../../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  if (!msg.guild) return msg.channel.send(locale('music.global.nodm'))
  const player = client.lavalink.players.get(msg.guild.id)

  if (!player) return msg.channel.send(locale('music.global.notplaying'))

  player.pause(!player.paused)

  if (player.paused) msg.channel.send(locale('music.pause.resume'))
  else msg.channel.send(locale('music.pause.pause'))
}

module.exports = fn
module.exports.aliases = ['pause', 'resume', 'ps']
