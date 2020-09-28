const { getSongs } = require('../../utils/lavalink')
const { MessageEmbed } = require('discord.js')

/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  if (!msg.guild) return msg.channel.send('ㅁㄴㅇㄹ')
  let player = client.lavalink.players.get(msg.guild.id)
  if (!player) player = await client.lavalink.join({ guild: msg.guild.id, channel: msg.member.voice.channel.id, node: 'main' })
  const [data] = (await getSongs(client.lavalink.nodes.get('main'), 'ytsearch:' + msg.query.args.join(' '))).tracks
 
  if (data) { 

    player.play(data.track)
    const embed = new MessageEmbed({ color: 0xff5ae5 })
  
    for (const key of Object.keys(data.info)) {
      embed.addField(key, data.info[key])
    }
  
    msg.channel.send(embed)
  } else if (!data) { 
  
  const [data1] = (await getSongs(client.lavalink.nodes.get('main'), 'scsearch:' + msg.query.args.join(' '))).tracks
  player.play(data1.track)
  const embed = new MessageEmbed({ color: 0xff5ae5 })

  for (const key of Object.keys(data1.info)) {
    embed.addField(key, data1.info[key])
  }

  msg.channel.send(embed)
  } else if (!data1) msg.channel.send("응~ 없어")
}

module.exports = fn
module.exports.aliases = ['play']
