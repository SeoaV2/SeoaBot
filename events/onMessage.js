const Query = require('../classes/Query')
const { registUser } = require('../utils/registDB')

/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Message} msg
 */
async function onMessage (client, msg) {
  const { prefix } = client.settings
  const { author, content } = msg

  if (author.bot) return
  if (!content.startsWith(prefix)) return

  let [userdata] = await client.db.select('locale').where('id', msg.author.id).from('userdata')
  if (!userdata) { await registUser(client, msg); userdata = { locale: 'en-US' } }

  msg.author.locale = userdata.locale

  const query = new Query(prefix, content)
  const target = client.commands.find(
    (command = { aliases: [] }) =>
      typeof command === 'function' &&
      command.aliases.includes(query.cmd)
  )

  const locale = (phrase, ...args) =>
    client.i18n.__({ phrase, locale: msg.author.locale }, ...args)

  if (!target) return
  target(client, msg, locale)
}

module.exports = onMessage
