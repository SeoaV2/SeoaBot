
/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg) {
  if (!msg.guild) return msg.channel.send('ㅁㄴㅇㄹ')
  const player = client.lavalink.players.get(msg.guild.id)
  const seek = Number(msg.query.args.join(' '))
  player.seek(seek)
}

module.exports = fn
module.exports.aliases = ['seek']
