const { getNumberWithOrdinal } = require('../../utils/numbering')

/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  let str = locale('quiz.leaderboard.title') + '```fix\n'
  const users = await client.db.select('id', 'quizscore').from('userdata').where('quizscore', '>', '0')
  const sorted = users.sort((a, b) => a.quizscore - b.quizscore)
  for (const user of sorted) {
    const index = sorted.indexOf(user) + 1
    const realuser = client.users.cache.get(user.id)
    str += getNumberWithOrdinal(index) + '. ' +
      (realuser
        ? locale('quiz.leaderboard.real', realuser.tag, user.id, user.quizscore)
        : locale('quiz.leaderboard.hidden', user.id, user.quizscore)) + '\n'
    if (index > 9) break
  }

  const author = sorted.findIndex((v) => v.id === msg.author.id)
  str += '```' + (author < 0 ? '' : locale('quiz.leaderboard.footer', sorted[author].quizscore, getNumberWithOrdinal(author + 1)))
  msg.channel.send(str)
}

module.exports = fn
module.exports.aliases = ['leader', 'leaderboard', '리더보드', '리더', '보드']
