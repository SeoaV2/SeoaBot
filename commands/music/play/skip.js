/**
 * @param {import('../../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  if (!msg.guild) return msg.channel.send(locale('music.global.nodm'))
  const player = client.lavalink.players.get(msg.guild.id)
  player.stop()
}

module.exports = fn
module.exports.aliases = ['skip', '스킵']
