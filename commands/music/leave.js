/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  if (!msg.guild) return msg.channel.send('ㅁㄴㅇㄹ')
  await client.lavalink.leave(msg.guild.id)
}

module.exports = fn
module.exports.aliases = ['leave']
