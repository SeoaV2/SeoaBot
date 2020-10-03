const { getNumberWithOrdinal } = require('../../utils/numbering')

/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  let str = locale('quiz.leaderboard.title') + '```fix\n'
  const users = await client.db.select('id', 'quizscore').from('userdata').where('quizscore', '>', '0').orderBy('quizscore', 'desc')
  for (const user of users) {
    const index = users.indexOf(user) + 1
    const realuser = !client.shard ? client.users.cache.get(user.id) : (await client.shard.fetchClientValues('users.cache')).flat().find((v) => v.id === user.id)
    str += getNumberWithOrdinal(index) + '. ' +
      (realuser
        ? locale('quiz.leaderboard.real', realuser.tag, user.id, user.quizscore)
        : locale('quiz.leaderboard.hidden', user.id, user.quizscore)) + '\n'
    if (index > 9) break
  }

  const author = users.findIndex((v) => v.id === msg.author.id)
  str += '```' + (author < 0 ? '' : locale('quiz.leaderboard.footer', users[author].quizscore, getNumberWithOrdinal(author + 1)))
  msg.channel.send(str)
}

module.exports = fn
module.exports.aliases = ['leader', 'leaderboard', '리더보드', '리더', '보드']
