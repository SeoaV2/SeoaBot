const { MessageEmbed } = require('discord.js')
const { getSongs } = require('../../../utils/lavalink')

/**
 * @param {import('../../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  switch (msg.query.args[0]) {
    case 'a':
    case 's':
    case 'add':
    case 'set': {
      // 인수값 없을떄
      if (!msg.query.args[1] || !msg.query.args[2]) return msg.channel.send(locale('music.mylist.set.usage', client.settings.prefix))

      // 트렉 번호 숫자로 변환 후 유효한지 확인
      const track = Number(msg.query.args[1])
      if (isNaN(track) || track % 1 !== 0 || track < 1 || track > 20) return msg.channel.send(locale('music.mylist.set.toohighorlow', track))

      // 검색
      const [data] = (await getSongs(client.lavalink.nodes.get('main'), 'ytsearch:' + msg.query.args.slice(2).join(' '))).tracks

      if (data) {
        const { title: vname, author: vauthor, identifier: vid } = data.info

        // 이미 트랙이 mylist에 있는지 확인
        const [exist] = await client.db.select('*').where('uid', msg.author.id).andWhere('track', track).from('mylist')

        // 이미 있으면 기존꺼 삭제
        if (exist) await client.db.delete().where('uid', msg.author.id).andWhere('track', track).from('mylist')

        // 검색한 트랙 mylist에 추가
        await client.db.insert({ uid: msg.author.id, track, vid, vname, vauthor }).into('mylist')

        // 추가된거 출력
        const embed = new MessageEmbed({
          color: 0xff5ae5,
          title: locale('music.mylist.set.added', track) + vname.length > 20 ? vname.substring(0, 20) + '...' : vname,
          description: 'by ' + vauthor
        }).setImage('http://i3.ytimg.com/vi/' + vid + '/maxresdefault.jpg')

        msg.channel.send(embed)
      } else msg.channel.send(locale('music.global.notfound', msg.query.args.slice(2).join(' ')))
      break
    }

    case 'l':
    case 'q':
    case 'ls':
    case 'list':
    case 'query': {
      // 사용자 트랙 뽑아서 트랙 번호대로 정렬
      const builder = client.db.select('*').where('uid', msg.author.id).orderBy('track').from('mylist')

      // 인수가 주워졌을때는 그 트랙 번호만 확인
      if (msg.query.args[1]) builder.andWhere('track', msg.query.args[1])

      // SQL 실행
      const datas = await builder

      // mylist 출력
      const embed = new MessageEmbed({ color: 0xff5ae5 })
      datas.forEach((data) => {
        embed.addField(data.track + '. ' + data.vname, 'by ' + data.vauthor)
      })

      if (embed.fields.length < 1) return msg.channel.send(locale('music.mylist.query.notfound'))
      msg.channel.send(embed)
      break
    }

    case 'p':
    case 'play': {
      if (!msg.guild) return msg.channel.send(locale('music.global.nodm'))
      if (!msg.member.voice.channel) return msg.channel.send(locale('music.global.nochannel'))
      let player = client.lavalink.players.get(msg.guild.id)
      if (!player) player = await client.lavalink.join({ guild: msg.guild.id, channel: msg.member.voice.channel.id, node: 'main' })

      // 인수값 없을떄
      if (!msg.query.args[1]) return msg.channel.send(locale('music.mylist.play.usage', client.settings.prefix))

      // 트렉 번호 숫자로 변환 후 유효한지 확인
      const track = Number(msg.query.args[1])
      if (isNaN(track) || track % 1 !== 0 || track < 1 || track > 20) return msg.channel.send(locale('music.mylist.play.toohighorlow', track))

      // 트랙 검색
      const [trackData] = await client.db.select('*').where('uid', msg.author.id).andWhere('track', track).from('mylist')

      // 큐 쿼리
      const { oid: prevOid } = ((await client.db.select('oid').where('gid', msg.guild.id).orderBy('oid', 'desc').limit(1).from('queue'))[0] || { oid: -1 })

      if (trackData) {
        const [data] = (await getSongs(client.lavalink.nodes.get('main'), 'https://www.youtube.com/watch?v=' + trackData.vid)).tracks

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

        const { title, author, identifier } = data.info

        // 큐 추가
        await client.db.insert({ oid: prevOid + 1, gid: msg.guild.id, vid: identifier, vname: title, vauthor: author }).into('queue')

        const embed = new MessageEmbed({
          color: 0xff5ae5,
          title: title.length > 30 ? title.substring(0, 30) + '...' : title,
          description: 'by ' + author
        }).setImage('http://i3.ytimg.com/vi/' + identifier + '/maxresdefault.jpg')

        msg.channel.send(embed)
      } else msg.channel.send(locale('music.global.notfound'))
      break
    }

    case 'r':
    case 'd':
    case 'rm':
    case 'del':
    case 'delete':
    case 'remove': {
      if (!msg.query.args[1]) return msg.channel.send(locale('music.mylist.remove.usage', client.settings.prefix))
      await client.db.delete().where('uid', msg.author.id).andWhere('track', msg.query.args[1]).from('mylist')
      msg.channel.send(locale('music.mylist.remove.removed', msg.query.args[1]))
      break
    }

    default: {
      msg.channel.send(locale('music.mylist.usage', client.settings.prefix))
    }
  }
}

module.exports = fn
module.exports.aliases = ['mylist', 'my', '마이', '마이리스트']
module.exports.devonly = true
