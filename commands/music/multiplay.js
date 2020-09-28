const { MessageEmbed } = require('discord.js')
const { getSongs } = require('../../utils/lavalink')
/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  if (!msg.guild) return msg.channel.send('ㅁㄴㅇㄹ')
  let player = client.lavalink.players.get(msg.guild.id)
  if (!player) player = await client.lavalink.join({ guild: msg.guild.id, channel: msg.member.voice.channel.id, node: 'main' })
  const [data] = (await getSongs(client.lavalink.nodes.get('main'), '' + msg.query.args.join(' '))).tracks
  //const [data] = (await getSongs(client.lavalink.nodes.get('main'), 'scsearch:' + msg.query.args.join(' '))).tracks
  if (!data) return msg.channel.send('응~ 없어')

  player.play(data.track)
  const embed = new MessageEmbed({ color: 0xff5ae5 })

  for (const key of Object.keys(data.info)) {
    if (data.info[key] == data.info.identifier) continue
    else embed.addField(key, data.info[key])
  }

  msg.channel.send(embed)
}

module.exports = fn
module.exports.aliases = ['multiplay', 'mplay']