const { MessageEmbed } = require('discord.js')

/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  const embed = new MessageEmbed({
    color: 0xff5ae5,
    title: locale('help.title', client.user.username)
  })

  for (const command of client.commands) {
    const aliases = command.aliases.map((curr) => '`' + client.settings.prefix + curr + '`').join(', ')
    embed.addField(aliases, locale('help.desc.' + command.aliases[0]), true)
  }

  msg.channel.send(embed)
}

module.exports = fn
module.exports.aliases = ['help', '도움', '도움말']
