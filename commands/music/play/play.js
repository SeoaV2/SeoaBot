const { getSongs } = require('../../../utils/lavalink')
const { MessageEmbed } = require('discord.js')

/**
 * @param {import('../../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  if (!msg.guild) return msg.channel.send(locale('music.global.nodm'))
  if (!msg.member.voice.channel) return msg.channel.send(locale('music.global.nochannel'))
  let player = client.lavalink.players.get(msg.guild.id)
  if (!player) player = await client.lavalink.join({ guild: msg.guild.id, channel: msg.member.voice.channel.id, node: 'main' })
  const [data] = (await getSongs(client.lavalink.nodes.get('main'), 'ytsearch:' + msg.query.args.join(' '))).tracks

  if (data) {
    player.play(data.track)
    const { title, author, identifier } = data.info
    const embed = new MessageEmbed({
      color: 0xff5ae5,
      title: title.length > 30 ? title.substring(0, 30) + '...' : title,
      description: 'by ' + author
    }).setImage('http://i3.ytimg.com/vi/' + identifier + '/maxresdefault.jpg')

    msg.channel.send(embed)
  } else msg.channel.send(locale('music.global.notplaying'))
}

module.exports = fn
module.exports.aliases = ['play']
