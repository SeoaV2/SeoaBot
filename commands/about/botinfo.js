/* eslint-disable no-multi-spaces */
const { MessageEmbed } = require('discord.js')

/**
 * @param {import('../../classes/Client')} client
 * @param {import('discord.js').Message} msg
*/
async function fn (client, msg, locale) {
  const embed = new MessageEmbed({
    title: locale('about.info.title', client.user.username),
    thumbnail: client.user.avatarURL(),
    color: 0xff5ae5,
    fields: [
      { name: locale('about.info.keys.tag'),      value: client.user.tag,                     inline: true },
      { name: locale('about.info.keys.commands'), value: locale('about.info.values.commands', client.commands.length),            inline: true },
      { name: locale('about.info.keys.users'),    value: locale('about.info.values.users',    await getSize(client, 'users')),    inline: true },
      { name: locale('about.info.keys.channels'), value: locale('about.info.values.channels', await getSize(client, 'channels')), inline: true },
      { name: locale('about.info.keys.guilds'),   value: locale('about.info.values.guilds',   await getSize(client, 'guilds')),   inline: true },
      { name: locale('about.info.keys.uptime'),   value: locale('about.info.values.uptime',   client.uptime), inline: true }
    ]
  }).setThumbnail(client.user.avatarURL())
  msg.channel.send(embed)
}

/**
  * @param {import('../../classes/Client')} client
 * @param {string} keyword
 */
async function getSize (client, keyword) {
  return !client.shard ? client[keyword].cache.size : (await client.shard.fetchClientValues('users.cache.' + keyword)).reduce((acc, cur) => acc + cur, 0)
}

module.exports = fn
module.exports.aliases = ['botinfo', '봇정보']
