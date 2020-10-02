/**
 * @param {import('../../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  if (!msg.guild) return msg.channel.send(locale('music.global.nodm'))
  if (!msg.member.voice.channel) return msg.channel.send(locale('music.global.nochannel'))
  const player = await client.lavalink.join({ guild: msg.guild.id, channel: msg.member.voice.channel.id, node: 'main' })
  msg.channel.send(locale('music.join'))
  player.on('error', (err) => msg.channel.send(locale('music.global.error', err.error)))
}

module.exports = fn
module.exports.aliases = ['join']
