const path = require('path').resolve()
const { exec } = require('child_process')
const { get, post } = require('superagent')

const start = () => exec('bash -c "' + path + '/utils/lavalink.sh"', console.log)

/**
 * @param {import('lavacord').LavalinkNode} node
 * @param {string} search
 * @return {string[]}
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
 * @param {(string|string[])} track or tracks
 * @return {object|object[]} track(s)info
 */
async function getDecode (node, track) {
  if (Array.isArray(track)) {
    const res = post('http://' + node.host + ':' + node.port + '/decodetracks')
      .set('Authorization', node.password)
      .send(track)
    return (await res).body
  } else {
    const params = new URLSearchParams()
    params.append('track', track)
    const res =
      await get('http://' + node.host + ':' + node.port + '/decodetrack?' + params)
        .set('Authorization', node.password)

    return res.body
  }
}

module.exports = { start, getSongs, getDecode }
