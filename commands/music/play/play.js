const { getSongs } = require('../../../utils/lavalink')
const { MessageEmbed } = require('discord.js')

/**
 * @param {import('../../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  if (!msg.guild) return msg.channel.send(locale('music.global.nodm'))
  if (!msg.member.voice.channel) return msg.channel.send(locale('music.global.nochannel'))
  let player = client.lavalink.players.get(msg.guild.id)
  if (!player) player = await client.lavalink.join({ guild: msg.guild.id, channel: msg.member.voice.channel.id, node: 'main' })

  const searchQuery = msg.query.args.join(' ')
  if (!searchQuery) return msg.channel.send(locale('music.play.usage', client.settings.prefix))
  const [data] = (await getSongs(client.lavalink.nodes.get('main'), searchQuery.startsWith('https://') ? searchQuery : ('ytsearch:' + searchQuery))).tracks

  if (data) {
    const { title, author, identifier } = data.info
    const { oid: prevOid } = ((await client.db.select('oid').where('gid', msg.guild.id).orderBy('oid', 'desc').limit(1).from('queue'))[0] || { oid: -1 })

    if (!player.playing) {
      await client.db.delete().where('gid', msg.guild.id).from('queue')
      player.removeAllListeners('end')

      player.play(data.track)
      player.addListener('end', async () => {
        await client.db.raw('delete from seoafixed.queue where gid=\'' + msg.guild.id + '\' order by oid limit 1;')
        const [next] = await client.db.select('*').limit(1).where('gid', msg.guild.id).orderBy('oid').from('queue')
        if (!next) return await client.lavalink.leave(msg.guild.id)
        const [data] = (await getSongs(client.lavalink.nodes.get('main'), 'https://www.youtube.com/watch?v=' + next.vid)).tracks
        if (!data) return
        player.play(data.track)
        const embed = new MessageEmbed({
          color: 0xff5ae5,
          title: next.vname.length > 30 ? next.vname.substring(0, 30) + '...' : next.vname,
          description: 'by ' + next.vauthor
        }).setImage('http://i3.ytimg.com/vi/' + next.vid + '/maxresdefault.jpg')

        msg.channel.send(embed)
      })
    }

    await client.db.insert({ oid: prevOid + 1, gid: msg.guild.id, vid: identifier, vname: title, vauthor: author }).into('queue')

    const embed = new MessageEmbed({
      color: 0xff5ae5,
      title: title.length > 30 ? title.substring(0, 30) + '...' : title,
      description: 'by ' + author
    }).setImage('http://i3.ytimg.com/vi/' + identifier + '/maxresdefault.jpg')

    msg.channel.send(embed)
  } else msg.channel.send(locale('music.global.notfound', msg.query.args.join(' ')))
}

module.exports = fn
module.exports.aliases = ['play', 'p']
