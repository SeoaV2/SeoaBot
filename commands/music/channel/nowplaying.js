const { getDecode } = require('../../../utils/lavalink')
const { MessageEmbed } = require('discord.js')

/**
 * @param {import('../../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  if (!msg.guild) return msg.channel.send(locale('music.global.nodm'))

  const player = client.lavalink.players.get(msg.guild.id)
  if (!(player || {}).playing) return msg.channel.send(locale('music.global.notplaying'))

  const { title, author, identifier } = await getDecode(client.lavalink.nodes.get('main'), player.track)
  const embed = new MessageEmbed({
    color: 0xff5ae5,
    title: title.length > 30 ? title.substring(0, 30) + '...' : title,
    description: 'by ' + author
  }).setImage('http://i3.ytimg.com/vi/' + identifier + '/maxresdefault.jpg')

  msg.channel.send(embed)
}

module.exports = fn
module.exports.aliases = ['np', 'nowplaying']
