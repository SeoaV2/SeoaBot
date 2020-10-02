const { MessageEmbed } = require('discord.js')

/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  const commands = {}

  for (const command of client.commands) {
    if (!command.aliases) continue
    if (command.devonly) continue
    const aliases = command.aliases.map((curr) => '`' + client.settings.prefix + curr + '`').join(', ')
    if (typeof commands[command.category] !== 'object') commands[command.category] = []
    commands[command.category].push({
      name: aliases,
      value: locale('help.desc.' + command.aliases[0]),
      inline: true
    })
  }

  const choose = msg.query.args[0]
  if (!choose) {
    const fields = Object.keys(commands).map((category) => {
      return {
        name: '`' + client.settings.prefix + 'help ' + category + '`',
        value: locale('help.global.titles.' + category)
      }
    })

    const embed = new MessageEmbed({
      color: 0xff5ae5,
      title: locale('help.title'),
      fields
    })
    return msg.channel.send(embed)
  }

  if (!commands[choose]) return msg.channel.send(new MessageEmbed({ color: 0xff0000, title: locale('help.notfound', choose) }))

  const embed = new MessageEmbed({
    color: 0xff5ae5,
    title: locale('help.global.titles.' + choose),
    fields: commands[choose]
  })

  msg.channel.send(embed)

  // for (const category of Object.keys(commands)) {
  //   console.log(category)
  //   const embed = new MessageEmbed({
  //     color: 0xff5ae5,
  //     title: locale('help.title.' + category),
  //     fields: commands[category]
  //   })

  //   msg.channel.send(embed)
  // }
}

module.exports = fn
module.exports.aliases = ['help', '도움', '도움말']
