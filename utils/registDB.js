const { MessageEmbed } = require('discord.js')

/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Message} msg
 */
async function registUser (client, msg) {
  const embed = new MessageEmbed({ color: 0xff5ae5, title: 'Hello! ' + msg.author.username + '!' })
  client.i18n.__h('about.greeting').forEach((locale) => embed.addField('[' + Object.keys(locale)[0] + ']', Object.values(locale)[0]))
  const m = await msg.channel.send(embed)
  await m.react('✅')
  await m.awaitReactions((r, u) => r.emoji.name === '✅' && u.id === msg.author.id, { max: 1 })
  await m.delete()
  await client.db.insert({ id: msg.author.id }).into('userdata')
}

module.exports = { registUser }
