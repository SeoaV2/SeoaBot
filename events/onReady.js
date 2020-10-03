/**
 * @param {import('../classes/Client')} client
 */
function onReady (client) {
  console.log(
    `${client.user.username} is now online!\n` +
    `prefix: ${client.settings.prefix}\n`
  )

  if (client.shard) client.user.setActivity(client.shard.count + ' shard(s)')
  else client.user.setActivity('Testing Build')
}

module.exports = onReady
