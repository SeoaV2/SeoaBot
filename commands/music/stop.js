
/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg) {
  if (!msg.guild) return msg.channel.send('ㅁㄴㅇㄹ')
  const player = client.lavalink.players.get(msg.guild.id)
  player.stop()
  msg.channel.send('byebye')
  musicdb.del(msg.guild.id)
  client.lavalink.leave(msg.guild.id)
}

module.exports = fn
module.exports.aliases = ['stop']
