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
    //if (client.musicdb.exists('name') == 0)  // 있으면 1 없으면 0
    await client.musicdb.rpush(msg.guild.id, data.track)
    for (const key of Object.keys(data.info)) {
      embed.addField(key, data.info[key], true)
    }
    msg.channel.send(embed)
  } else if (!data) {
    const [data1] = (await getSongs(client.lavalink.nodes.get('main'), 'scsearch:' + msg.query.args.join(' '))).tracks
    player.play(data1.track)
    const embed = new MessageEmbed({ color: 0xff5ae5 })

    await client.musicdb.rpush(msg.guild.id, data1.track)

    for (const key of Object.keys(data1.info)) {
      embed.addField(key, data1.info[key])
    }

    msg.channel.send(embed)
  } else msg.channel.send('응~ 없어')
  
  player.once("end", data => {
    if (data.reason === "REPLACED") return; // Ignore REPLACED reason to prevent skip loops
    // Play next song
    await client.musicdb.del(msg.guild.id) //매우 작동 잘됨
    client.lavalink.leave(msg.guild.id) // TODO: make play loop
  })
}
// 저거 받아서 저장하고 나중에 틀게 해야 겠네
module.exports = fn
module.exports.aliases = ['play']
