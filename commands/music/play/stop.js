/**
 * @param {import('../../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  if (!msg.guild) return msg.channel.send(locale('music.global.nodm'))
  const player = client.lavalink.players.get(msg.guild.id)
  player.stop()
<<<<<<< HEAD:commands/music/stop.js
  msg.channel.send('byebye')
  client.musicdb.del(msg.guild.id)
=======
  msg.channel.send(locale('music.stop'))
>>>>>>> 3c9a566bfebe6f6647d968997ad538d17c1e452c:commands/music/play/stop.js
  client.lavalink.leave(msg.guild.id)
}

module.exports = fn
module.exports.aliases = ['stop']
