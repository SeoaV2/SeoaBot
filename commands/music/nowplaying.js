const { getDecode } = require('../../utils/lavalink')
const { MessageEmbed } = require('discord.js')

/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
    if (!msg.guild) return msg.channel.send('ㅁㄴㅇㄹ')
    let player = client.lavalink.players.get(msg.guild.id)
    if (player.playing == false) return msg.channel.send("wtf")
    let data = await getDecode(client.lavalink.nodes.get('main'), player.track)

    const embed = new MessageEmbed({ color: 0xff5ae5 })

    for (const key of Object.keys(data)) {
      if (data[key] == data.identifier) continue
      else embed.addField(key, data[key])
    }
  
    msg.channel.send(embed)
}
  
module.exports = fn
module.exports.aliases = ['np', 'nowplaying']
  