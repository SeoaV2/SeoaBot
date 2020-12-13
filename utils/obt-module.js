const { MessageEmbed } = require('discord.js')

/**
 * @param {import('../classes/Client')} client
 * @param {import('discord.js').Message} msg
 */
async function obtVerify (client, msg) {
  const [exists] = await client.db.select('serverid').where('serverid', msg.guild.id).from('obt_whitelist')
  if (exists) return true

  const embed = new MessageEmbed({
    color: 0xff0000,
    title: 'OBT 등록 필요',
    description:
      '이 서버에서 **' + client.user.username + '**을 사용하려면\n' +
      '서버 소유자가 OBT등록을 진행해야 합니다\n\n' +
      '[OBT 등록하러 가기](https://obtseoa.pmh.codes)'
  })
  msg.channel.send(embed)

  return false
}

module.exports = { obtVerify }
