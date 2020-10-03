/**
 * @param {import('../../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  if (!msg.guild) return msg.channel.send(locale('music.global.nodm'))
  const player = client.lavalink.players.get(msg.guild.id)

  if (!player) return msg.channel.send(locale('music.global.notplaying'))

  const vol = Number(msg.query.args[0])
  if (!vol) return msg.channel.send(locale('music.volume.state', player.state.volume))
  if (isNaN(vol) || vol % 1 !== 0 || vol <= 0 || vol >= 200) return msg.channel.send(locale('music.volume.toohighorlow'))

  await player.volume(vol)
  msg.channel.send(locale('music.volume.set', vol))
}

module.exports = fn
module.exports.aliases = ['volume', 'vol']
