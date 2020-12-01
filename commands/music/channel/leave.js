/**
 * @param {import('../../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  if (!msg.guild) return msg.channel.send(locale('music.global.nodm'))
  await client.db.delete().where('gid', msg.guild.id).from('queue')
  await client.lavalink.leave(msg.guild.id)
  msg.channel.send(locale('music.leave'))
}

module.exports = fn
module.exports.aliases = ['leave', 'l']
