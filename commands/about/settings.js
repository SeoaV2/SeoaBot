const { MessageEmbed } = require('discord.js')
const modifiable = ['locale']

/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  const [data] = await client.db.select('*').where('id', msg.author.id).from('userdata')
  const args = msg.query.args

  if (args.length < 1) {
    const embed = new MessageEmbed({
      color: 0xff5ae5,
      title: locale('settings.title'),
      description: locale('settings.desc', client.settings.prefix)
    })

    for (const key of Object.keys(data)) {
      embed.addField(key, data[key], data[key].length < 20)
    }

    return msg.channel.send(embed)
  }

  if (!args[1]) return msg.channel.send(new MessageEmbed({ title: locale('settings.novalue', client.settings.prefix), color: 0xff0000 }))
  if (!modifiable.includes(args[0])) return msg.channel.send(new MessageEmbed({ title: locale('settings.notmodfiable', args[0]), color: 0xff0000 }))

  if (args[0] === 'locale' && !client.i18n.getLocales().includes(args[1])) {
    msg.channel.send(new MessageEmbed({
      color: 0xff0000,
      title: locale('settings.localenotfound', args[1]),
      description: locale('settings.locales') + '\n- `' + client.i18n.getLocales().join('`\n- `') + '`'
    }))
    return
  }

  const obj = {}
  obj[args[0]] = args[1]
  await client.db.update(obj).where('id', msg.author.id).from('userdata')

  msg.channel.send(new MessageEmbed({ color: 0x00ff00, title: locale('settings.done', args[0], args[1]) }))
}

module.exports = fn
module.exports.aliases = ['set', 'settings', '설정']
