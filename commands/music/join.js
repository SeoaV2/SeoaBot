/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  if (!msg.guild) return msg.channel.send('ㅁㄴㅇㄹ')
  const player = await client.lavalink.join({ guild: msg.guild.id, channel: msg.member.voice.channel.id, node: 'main' })
  player.on('error', console.log)
}

module.exports = fn
module.exports.aliases = ['join']
