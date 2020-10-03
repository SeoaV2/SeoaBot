const path = require('path').resolve()
const debug = require('debug')('seoabot:shardmgr')
const { existsSync } = require('fs')
const { ShardingManager } = require('discord.js')

debug('Check the existance of %o', 'config.json')

this._settingPath = path + '/config.json'
this._settingHas = existsSync(this._settingPath)

if (this._settingHas) {
  debug('Load config')
  const { token = process.env.TOKEN } = require(this._settingPath)
  if (!token) throw new Error('Token not provided')

  const shard = new ShardingManager(path + '/index.js', { token, autoSpawn: true })

  shard.spawn(2)
  shard.on('shardCreate', (s) => debug('End of starting shard #%o', s.id))
} else throw new Error('./config.json file not exists')
