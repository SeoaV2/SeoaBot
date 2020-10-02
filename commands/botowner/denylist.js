
/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  const id = msg.query.args[1]
  const choice = msg.query.args[0]
  if (choice === "add"){
  }
  if (choice === "list"){
  }
}
module.exports = fn
module.exports.aliases = ['denylist', 'deny']
