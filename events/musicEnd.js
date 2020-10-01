
/**
 * @param {import('../classes/Client')} client
 */
function musicEnd(client, player) {
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
module.exports = musicEnd