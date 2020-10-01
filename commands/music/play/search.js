const { MessageEmbed } = require('discord.js')
const { getSongs } = require('../../../utils/lavalink')

/**
 * @param {import('../../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  const embed = new MessageEmbed({ color: 0xff5ae5 })
  const [link] = (await getSongs(client.lavalink.nodes.get('main'), msg.query.args.join(' '))).tracks

  if (link) {
    for (const key of Object.keys(link.info)) {
      if (link.info[key] === link.info.identifier) continue
      else embed.addField(key, link.info[key])
    }
    return msg.channel.send(embed)
  } else if (msg.query.args.slice(0, 2)[0] === 'sc' && 'soundcloud') {
    const [sc] = (await getSongs(client.lavalink.nodes.get('main'), 'scsearch:' + msg.query.args.slice(1, 3)[0])).tracks
    const { title, author, identifier } = sc.info
    const embed = new MessageEmbed({
      color: 0xff5ae5,
      title: title.length > 30 ? title.substring(0, 30) + '...' : title,
      description: 'by ' + author
    }).setImage('http://i3.ytimg.com/vi/' + identifier + '/maxresdefault.jpg')
    return msg.channel.send(embed)
  } else if (msg.query.args.slice(0, 2)[0] === 'yt' && 'youtube') {
    const [yt] = (await getSongs(client.lavalink.nodes.get('main'), 'ytsearch:' + msg.query.args.slice(1, 3)[0])).tracks
    const { title, author, identifier } = yt.info
    const embed = new MessageEmbed({
      color: 0xff5ae5,
      title: title.length > 30 ? title.substring(0, 30) + '...' : title,
      description: 'by ' + author
    }).setImage('http://i3.ytimg.com/vi/' + identifier + '/maxresdefault.jpg')
    return msg.channel.send(embed)
  } else {
    msg.channel.send(locale('music.search.usage', client.settings.prefix))
  }
}

module.exports = fn
module.exports.aliases = ['search']
