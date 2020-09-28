const { MessageEmbed } = require('discord.js')
const { getSongs } = require('../../utils/lavalink')

/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) { 
  const embed = new MessageEmbed({ color: 0xff5ae5 })
  const [link] = (await getSongs(client.lavalink.nodes.get('main'), msg.query.args.join(" "))).tracks

  if (link) {
    for (const key of Object.keys(link.info)) {
        if (link.info[key] == link.info.identifier) continue
        else embed.addField(key, link.info[key])
      }
    return msg.channel.send(embed)
  } else if (msg.query.args.slice(0, 2)[0] === 'sc' && 'soundcloud' ) {
    const [sc] = (await getSongs(client.lavalink.nodes.get('main'), 'scsearch:' + msg.query.args.slice(1, 3)[0])).tracks
    for (const key of Object.keys(sc.info)) {
     if (sc.info[key] == sc.info.identifier) continue
     else embed.addField(key, sc.info[key])
    }
    return msg.channel.send(embed)

  } else if (msg.query.args.slice(0, 2)[0] === 'yt' && 'youtube') {
    const [yt] = (await getSongs(client.lavalink.nodes.get('main'), 'ytsearch:' + msg.query.args.slice(1, 3)[0])).tracks
    for (const key of Object.keys(yt.info)) {
     if (yt.info[key] == yt.info.identifier) continue
     else embed.addField(key, yt.info[key])
    }
    return msg.channel.send(embed)

 } else {
    msg.channel.send('`link` or `yt [search]` or `sc [search]`')
 }
}

module.exports = fn
module.exports.aliases = ['search']
