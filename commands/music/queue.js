const { getDecode } = require('../../utils/lavalink')
const { MessageEmbed } = require('discord.js')
/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg) {
    if (!msg.guild) return msg.channel.send('ㅁㄴㅇㄹ')
    const player = client.lavalink.players.get(msg.guild.id)
 //   if (!player.playing) return msg.channel.send('wtf')
    client.musicdb.lrange(msg.guild.id, 0, -1, async (err, data)=>{
        if(err){
          throw err;
        }
        if (!data) return msg.channel.send("not data")
        const embed = new MessageEmbed({ color: 0xff5ae5 })
        const data1 = await getDecode(client.lavalink.nodes.get('main'), data)
        for (const key of Object.keys(data1)) {
            embed.addField(Number(key)+ 1, data1[key].info.title, true)
        }
        msg.channel.send(embed)
    })
}
  
module.exports = fn
module.exports.aliases = ['q']
  