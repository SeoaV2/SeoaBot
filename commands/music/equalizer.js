/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg) {
  if (!msg.guild) return msg.channel.send('ㅁㄴㅇㄹ')
  const player = client.lavalink.players.get(msg.guild.id)
  const band = Number(msg.query.args.join(' ')[0])
  const gain = Number(msg.query.args.slice(1, 3)[0])
  console.log(band)
  console.log(gain)
  if (band <= 0) return msg.channel.send(player.state.equalizer)
  else if (band >= 14) return msg.channel.send(player.state.equalizer)
  if (gain <= -0.25) return msg.channel.send(player.state.equalizer)
  else if (gain >= 1.0) return msg.channel.send(player.state.equalizer)
  player.equalizer(band, gain)
}

module.exports = fn
module.exports.aliases = ['equalizer']
