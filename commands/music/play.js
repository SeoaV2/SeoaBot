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

  console.log(data.track);
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
  } else return msg.channel.send('응~ 없어')
  // 문제점 1. end를 어디에 넣을 것이냐
  player.once("end", data => {
    if (data.reason === "REPLACED") return; 
   // await client.musicdb.del(msg.guild.id) //매우 작동 잘됨
   client.musicdb.lrange(msg.guild.id, 0, -1, async (err, data)=>{
    if(err){
      throw err;
    }
    if(!data)  {
      client.lavalink.leave(msg.guild.id) 
      return msg.channel.send("not data")
    }
    await client.musicdb.lrem(msg.guild.id, 1, data[0])
    const data1 = await getDecode(client.lavalink.nodes.get('main'), data[0])
    msg.channel.send(data1)
}) 
    console.log("d");
    // TODO: make play loop
})
}
// 저거 받아서 저장하고 나중에 틀게 해야 겠네
module.exports = fn
module.exports.aliases = ['play']
