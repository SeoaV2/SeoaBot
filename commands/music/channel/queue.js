const { MessageEmbed } = require('discord.js')

/**
 * @param {import('../../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  if (!msg.guild) return msg.channel.send(locale('music.global.nodm'))
  const player = client.lavalink.players.get(msg.guild.id)

  if (!player) return msg.channel.send(locale('music.global.notplaying'))

  const embed = new MessageEmbed({ color: 0xff5ae5, title: locale('music.queue.title', msg.guild.name) })
  const queue = await client.db.select('*').where('gid', msg.guild.id).from('queue')
  for (const video of queue) {
    embed.addField((!queue.indexOf(video) ? locale('music.queue.nowplaying') + ': ' : queue.indexOf(video) + '. ') + video.vname, 'by ' + video.vauthor)
  }

  msg.channel.send(embed)
}

module.exports = fn
module.exports.aliases = ['queue', '큐', 'q']
