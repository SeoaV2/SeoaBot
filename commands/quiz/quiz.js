const { MessageEmbed } = require('discord.js')
const quizData = require('../../data/quizs.json')
const reactable = ['759314864463282216', '759314864794763265']

/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  const selected = msg.query.args[0]
  const quizno = selected || Math.floor(Math.random() * quizData.length)
  const target = quizData[quizno]

  if (!target) {
    msg.channel.send(new MessageEmbed({
      color: 0xff0000,
      description: locale('quiz.play.notfound', quizno)
    }))
    return
  }

  const embed = new MessageEmbed({
    title: locale('quiz.play.title', msg.author.username),
    color: 0xff5ae5,
    description: locale('quiz.play.descript', 'https://github.com/SeoaV2/SeoaBot-CodeQuiz/issues/new/choose'),
    fields: [{
      name: locale('quiz.play.qtitle', quizno, target.language),
      value: target.question.replace('{username}', '<@' + msg.author.id + '>')
    }]
  }).setImage(target.image)

  const m = await msg.channel.send(embed)
  m.react(reactable[0])
  m.react(reactable[1])
  const reaction = (await m.awaitReactions((r, u) => reactable.includes(r.emoji.id) && u.id === msg.author.id, { max: 1 })).first()

  if (target.answer !== Boolean(reactable.indexOf(reaction.emoji.id))) {
    embed
      .setColor(0xff0000)
      .setTitle(locale('quiz.play.wrong'))
      .addField('A.', target.explanation)
    m.edit(embed)
    return
  }

  await client.db.increment('quizscore', target.point).where('id', msg.author.id).from('userdata')
  embed
    .setColor(0x00ff00)
    .setTitle(locale('quiz.play.correct', target.point))
    .addField('A.', target.explanation)
  m.edit(embed)
}

module.exports = fn
module.exports.aliases = ['quiz', '퀴즈']
