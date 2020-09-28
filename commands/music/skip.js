/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg) {
    if (!msg.guild) return msg.channel.send('ㅁㄴㅇㄹ')
    const player = client.lavalink.players.get(msg.guild.id)
   // if (player.playing) player.stop()
   client.musicdb.lrange(msg.guild.id, 0, -1, async (err, data)=>{
    await client.musicdb.lrem(msg.guild.id, 1, data[0])
   })
}
  
module.exports = fn
module.exports.aliases = ['skip']
  