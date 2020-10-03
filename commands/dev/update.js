const { exec } = require('child_process')

/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg) {
  const SEOAGUILD = client.settings.seoaguild || '558296123794653206'
  const TEAMSEOA = client.settings.seoateamrole || '605027221094137856'
  if (!client.guilds.resolve(SEOAGUILD).members.resolve(msg.author.id).roles.cache.has(TEAMSEOA)) return

  const m = await msg.channel.send('Updating...\n\n' + Date())
  exec('git pull origin $(git branch | grep "*" | sed "s/\\* //g")', (_, stdout, stderr) => {
    m.edit((stdout || stderr) + '\n' + Date())
  })
}

module.exports = fn
module.exports.aliases = ['update']
module.exports.devonly = true
