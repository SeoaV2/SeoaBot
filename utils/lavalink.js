const path = require('path').resolve()
const { exec } = require('child_process')
const { get } = require('superagent')

const start = () => exec('bash -c "' + path + '/utils/lavalink.sh"', console.log)

/**
 * @param {import('lavacord').LavalinkNode} node
 * @param {string} search
 */
async function getSongs (node, search) {
  const params = new URLSearchParams()
  params.append('identifier', search)
  const res =
    await get('http://' + node.host + ':' + node.port + '/loadtracks?' + params)
      .set('Authorization', node.password)

  return res.body
}

/**
 * @param {import('lavacord').LavalinkNode} node
 * @param {string} track
 */

async function getDecode (node, track) {
  const params = new URLSearchParams()
  params.append('track', track)
  const res =
    await get('http://' + node.host + ':' + node.port + '/decodetrack?' + params)
      .set('Authorization', node.password)

  return res.body
}

module.exports = { start, getSongs, getDecode }