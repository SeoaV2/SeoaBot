const { MessageEmbed } = require('discord.js')

/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  if (!msg.guild) return msg.channel.send('ㅁㄴㅇㄹ')
  let player = client.lavalink.players.get(msg.guild.id)

  const vol = Number(msg.query.args.join(' '))
  if (vol <= 0) return msg.channel.send(player.state.volume)
  else if (vol >= 200) msg.channel.send(player.state.volume)
  else player.volume(vol)
}

module.exports = fn
module.exports.aliases = ['volume', 'vol']
