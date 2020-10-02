const path = require('path').resolve()
const { exec } = require('child_process')

const startLavalink = () => exec('bash -c "' + path + '/scripts/lavalink.sh"', log)
const startMariadb = () => exec('bash -c "' + path + '/scripts/mariadb.sh"', log)
const startRedis = () => exec('bash -c "' + path + '/scripts/redis.sh"', console.log)

function log (err, stdout, stderr) {
  if (err) return console.log(err.message)
  const msg = [stdout, stderr].join(' ').trim()

  console.log(msg.replace('[[stop]]', ''))
  if (msg.endsWith('[[stop]]')) process.exit()
}

module.exports = { startLavalink, startMariadb, startRedis }
