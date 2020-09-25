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
      { name: locale('about.info.keys.commands'), value: locale('about.info.values.commands', client.commands.length),     inline: true },
      { name: locale('about.info.keys.users'),    value: locale('about.info.values.users',    client.users.cache.size),    inline: true },
      { name: locale('about.info.keys.channels'), value: locale('about.info.values.channels', client.channels.cache.size), inline: true },
      { name: locale('about.info.keys.guilds'),   value: locale('about.info.values.guilds',   client.guilds.cache.size),   inline: true },
      { name: locale('about.info.keys.uptime'),   value: locale('about.info.values.uptime',   client.uptime),              inline: true }
    ]
  })
  msg.channel.send(embed)
}

module.exports = fn
module.exports.aliases = ['botinfo', '봇정보']
