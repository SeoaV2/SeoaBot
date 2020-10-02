const Query = require('../classes/Query')
const { registUser } = require('../utils/registDB')
const debug = require('debug')('seoabot:event:message')

/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Message} msg
 */
async function onMessage (client, msg) {
  const { prefix } = client.settings
  const { author, content } = msg

  if (author.bot) return
  if (!content.startsWith(prefix)) return

  debug('Get locale of user who executed the command')
  let [userdata] = await client.db
    .select('locale')
    .where('id', msg.author.id)
    .from('userdata')
  if (!userdata) {
    await registUser(client, msg)
    userdata = { locale: 'en-US' }
  }

  debug('Analyze message')
  const query = new Query(prefix, content)

  debug('Get the command function')
  const target = client.commands.find(
    (command = { aliases: [] }) =>
      typeof command === 'function' &&
      (command.aliases || []).includes(query.cmd)
  )

  msg.author.locale = userdata.locale
  msg.query = query

  const locale = (phrase, ...args) =>
    client.i18n.__({ phrase, locale: msg.author.locale }, ...args)

  debug('Run the command')
  if (!target) return
  target(client, msg, locale)
}

module.exports = onMessage
