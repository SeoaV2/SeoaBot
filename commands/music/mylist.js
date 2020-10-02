
/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  const songs = msg.query.args[1]
  const choice = msg.query.args[0]
  if (choice === "add"){
    await client.db.increment('mylist',  songs).where('id', id).from('userdata')
  }
  if (choice === "list"){
    const users = await client.db.select('id', 'mylist').from('userdata').where('mylist', id)
    msg.channel.send(users)
  }
}
module.exports = fn
module.exports.aliases = ['denylist', 'deny']
