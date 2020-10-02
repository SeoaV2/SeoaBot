/**
 * @param {import('../../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  client.lavalink.once('reconnecting', (node) => node.destroy())
  msg.channel.send('start')
}

module.exports = fn
// module.exports.aliases = ['fix']
