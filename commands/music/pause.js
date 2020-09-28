
/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg) {
  if (!msg.guild) return msg.channel.send('ㅁㄴㅇㄹ')
  const player = client.lavalink.players.get(msg.guild.id)
  if (player.paused) return msg.channel.send('>resume')
  player.pause(true)
}

module.exports = fn
module.exports.aliases = ['pause']
