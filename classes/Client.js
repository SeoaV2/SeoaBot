const { resolve: path } = require('path')
const { Client } = require('discord.js')
const { existsSync } = require('fs')
const lavalinkUtils = require('../utils/lavalink')
const { Manager: Lavalink } = require('@lavacord/discord.js')
const { readRecursively } = require('../utils/readFiles')
const { I18n } = require('i18n')
const redisUtils = require('../utils/redis')
const knex = require('knex')
const Redis = require('redis')
const musicEnd = require('../events/musicEnd')
const debug = require('debug')('seoabot:client')


class eClient extends Client {
  constructor () {
    debug('Starting up')

    super()
    this._ = {}

    debug('Check the existance of %o', 'config.json')
    this._settingPath = path() + '/config.json'
    this._settingHas = existsSync(this._settingPath)

    if (this._settingHas) {
      debug('Load config')
      const {
        token = process.env.TOKEN,
        prefix = (process.env.PREFIX || '>'),
        ...settings
      } = require(this._settingPath)

      if (!token) throw new Error('Token not provided')
      this.settings = { token, prefix, ...settings }
    }

    debug('Check the existance of %o folder', 'commands')
    this._commandsPath = path() + '/commands'
    this._commandsHas = existsSync(this._commandsPath)

    if (this._commandsHas) {
      debug('Load command files')
      this.commands = []
      readRecursively(this._commandsPath)
        .forEach((command) => {
          if (!command.endsWith('.js')) return

          command = require(command)
          this.commands.push(command)
        })
    } else throw new Error('./commands/ folder not exists')

    lavalinkUtils.start()
    redisUtils.start()

    debug('Initialize database')
    this.db = knex({ client: 'mysql', connection: this.settings.database || { user: 'seoafixed', host: 'localhost', database: 'seoafixed' } })
    this.i18n = new I18n({ objectNotation: true, directory: path() + '/locales' })
    this.lavalink = new Lavalink(this, [{ id: 'main', host: 'localhost', port: 2333, password: 'passwd' }])
    this.musicdb = new Redis.createClient(6379,'127.0.0.1', null)

    this.on('ready', () => setTimeout(() => this.lavalink.connect(), 5000))
    this.musicdb.on('ready', () => console.log("redis ready"))
    this.musicdb.on('connect', () => console.log('redis connect')) 
  }

  start (token = this.settings.token) {
    debug('Login to Discord')
    this.login(token)
  }

  regist (event = 'ready', exec = () => {}) {
    debug('Register function to %o event', event)
    this.on(event, (...args) => {
      exec(this, ...args)
    })
  }
}

module.exports = eClient
