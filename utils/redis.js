const path = require('path').resolve()
const { exec } = require('child_process')

const start = () => exec('bash -c "' + path + '../scripts/redis.sh"', console.log)

module.exports = { start }