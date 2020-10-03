/* eslint-disable no-unused-vars */

/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  const SEOAGUILD = client.settings.seoaguild || '558296123794653206'
  const TEAMSEOA = client.settings.seoateamrole || '605027221094137856'
  if (!client.guilds.resolve(SEOAGUILD).members.resolve(msg.author.id).roles.cache.has(TEAMSEOA)) return

  const { settings, db, i18n, lavalink } = client
  const { author, member, guild, channel } = msg

  let res
  try {
    // eslint-disable-next-line no-eval
    res = eval(msg.query.args.join(' '))
  } catch (err) { return msg.channel.send('```js\n' + err.split(settings.token).join('<hidden>') + '```') }

  try {
    res = JSON.stringify(res)
  } catch (_) {}

  msg.channel.send('```js\n' + res.split(client.settings.token).join('<hidden>') + '```')
}

module.exports = fn
module.exports.aliases = ['eval']
module.exports.devonly = true
