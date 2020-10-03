const { MessageEmbed } = require('discord.js')
const { getSongs } = require('../../../utils/lavalink')

/**
 * @param {import('../../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  const [data] = (await getSongs(client.lavalink.nodes.get('main'), 'ytsearch:' + msg.query.args.join(' '))).tracks

  if (data) {
    const { title, author, identifier } = data.info
    const embed = new MessageEmbed({
      color: 0xff5ae5,
      title: title.length > 30 ? title.substring(0, 30) + '...' : title,
      description: 'by ' + author
    }).setImage('http://i3.ytimg.com/vi/' + identifier + '/maxresdefault.jpg')

    msg.channel.send(embed)
  } else msg.channel.send(locale('music.global.notfound', msg.query.args.join(' ')))
}

module.exports = fn
module.exports.aliases = ['search']
