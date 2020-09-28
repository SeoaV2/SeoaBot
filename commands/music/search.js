const { MessageEmbed } = require('discord.js')
const { getSongs } = require('../../utils/lavalink')

/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) { //scsearch, ytsearch 
  const [sc] = (await getSongs(client.lavalink.nodes.get('main'), 'scsearch:' + msg.query.args.join(' '))).tracks
  const [yt] = (await getSongs(client.lavalink.nodes.get('main'), 'ytsearch:' + msg.query.args.join(' '))).tracks
  const [link] = (await getSongs(client.lavalink.nodes.get('main'), msg.query.args.join(' '))).tracks

  const embed = new MessageEmbed({ color: 0xff5ae5 })

  if (link) {
    for (const key of Object.keys(link.info)) {
        if (link.info[key] == link.info.identifier) continue
        else embed.addField(key, link.info[key])
      }
    
    return msg.channel.send(embed)
  } else if (msg.query.args.join(' ') == 'sc' || 'soundcloud') {
  for (const key of Object.keys(sc.info)) {
    if (sc.info[key] == sc.info.identifier) continue
    else embed.addField(key, sc.info[key])
  }
  msg.channel.send(embed)
  } else if (msg.query.args.join(' ') == 'yt' || 'youtube') {
  for (const key of Object.keys(yt.info)) {
    if (yt.info[key] == yt.info.identifier) continue
    else embed.addField(key, yt.info[key])
  }
  msg.channel.send(embed)
 } else {
    msg.channel.send('`link` or `yt [search]` or `sc [search]`')
 }
}

module.exports = fn
module.exports.aliases = ['search']
