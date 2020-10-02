
/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  const id = msg.query.args[1]
  const choice = msg.query.args[0]
  if (choice === "add"){
    await client.db.increment('denylist',  id).where('id', id).from('userdata')
  }
  if (choice === "list"){
    const users = await client.db.select('id', 'denylist').from('userdata').where('denylist', id)
    msg.channel.send(users)
  }
}
module.exports = fn
module.exports.aliases = ['denylist', 'deny']
