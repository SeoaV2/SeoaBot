const { MessageEmbed } = require('discord.js')

/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg) {
  const SEOAGUILD = client.settings.seoaguild || '558296123794653206'
  const TEAMSEOA = client.settings.seoateamrole || '605027221094137856'
  if (!client.guilds.resolve(SEOAGUILD).members.resolve(msg.author.id).roles.cache.has(TEAMSEOA)) return

  switch (msg.query.args[0]) {
    case 'add': {
      if (!msg.query.args[1] || !msg.query.args[2]) return msg.channel.send(client.settings.prefix + 'blacklist add <userid> <...reason>')
      await client.db.insert({ id: msg.query.args[1], reason: msg.query.args.slice(2).join(' ') }).into('blacklist')
      msg.channel.send('done.')
      break
    }

    case 'query': {
      const builder = client.db.select('*').from('blacklist').limit(20)
      if (msg.query.args[1]) builder.where('id', msg.query.args[1])
      const datas = await builder
      const embed = new MessageEmbed()
      datas.forEach((data) => {
        embed.addField(((client.users.resolve(data.id) || { tag: 'unknown' }).tag) + '(' + data.id + ')', data.reason)
      })
      if (embed.fields.length < 1) return msg.channel.send('not found')
      msg.channel.send(embed)
      break
    }

    case 'remove': {
      if (!msg.query.args[1]) return msg.channel.send(client.settings.prefix + 'blacklist remove <userid>')
      await client.db.delete().where('id', msg.query.args[1]).from('blacklist')
      msg.channel.send('done.')
      break
    }

    case 'modify': {
      if (!msg.query.args[1] || !msg.query.args[2]) return msg.channel.send(client.settings.prefix + 'blacklist modify <userid> <...reason>')
      await client.db.update('reason', msg.query.args.slice(2).join(' ')).where('id', msg.query.args[1]).from('blacklist')
      msg.channel.send('done.')
      break
    }

    default: {
      msg.channel.send('`%sblacklist add`, `%sblacklist query`, `%sblacklist remove`, `%sblacklist modify`'.split('%s').join(client.settings.prefix))
    }
  }
}

module.exports = fn
module.exports.aliases = ['blacklist', 'black', '블랙', '블랙리스트']
module.exports.devonly = true
