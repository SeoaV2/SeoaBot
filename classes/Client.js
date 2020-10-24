const path = require('path').resolve()
const { Client } = require('discord.js')
const { existsSync } = require('fs')
const { Manager: Lavalink } = require('@lavacord/discord.js')
const { readRecursively } = require('../utils/readFiles')
const { I18n } = require('i18n')
const knex = require('knex')
const debug = require('debug')('seoabot:client')
const debugSettings = require('debug')('seoabot:settings')

class eClient extends Client {
  constructor () {
    debug('Starting up')
    super()

    debug('Check the existance of %o', 'config.json')
    this._settingPath = path + '/config.json'
    this._settingHas = existsSync(this._settingPath)

    if (this._settingHas) {
      debug('Load config')
      const {
        token = process.env.TOKEN,
        prefix = (process.env.PREFIX || '>'),
        settings = {}
      } = require(this._settingPath)

      debug('Check the token was provided')
      if (!token) throw new Error('Token not provided')

      debug('Check the setting value and defaults it if not set')
      if (settings.useMusicFeature == null) settings.useMusicFeature = true
      if (!settings.tryLavalink) settings.tryLavalink = 10

      debugSettings('Show current settings')
      for (const item in settings) debugSettings('%s: %o', item, settings[item])
      this.settings = { token, prefix, ...settings }
    } else throw new Error('./config.json file not exists')

    debug('Check the existance of %o folder', 'commands')
    this._commandsPath = path + '/commands'
    this._commandsHas = existsSync(this._commandsPath)

    if (this._commandsHas) {
      debug('Load command files')
      this.commands = []
      readRecursively(this._commandsPath)
        .forEach((command) => {
          if (!command.endsWith('.js')) return

          const category = command.replace(this._commandsPath, '').split('/')[1]
          command = require(command)
          command.category = category
          this.commands.push(command)
        })
    } else throw new Error('./commands/ folder not exists')

    debug('Initialize database')
    this.db = knex({
      client: 'mysql',
      connection: this.settings.database || {
        user: 'seoafixed',
        host: 'localhost',
        database: 'seoafixed'
      }
    })

    this.i18n = new I18n({
      objectNotation: true,
      directory: path + '/locales'
    })

    this.lavalink = new Lavalink(this, [{
      id: 'main',
      host: 'localhost',
      port: 2333,
      password: 'passwd'
    }])

    debug('Register lavalink connect to %o event', 'ready')

    if (this.settings.useMusicFeature) {
      this.on('ready', () => {
        for (let trys = 1; trys <= (this.settings.tryLavalink || 10); trys++) {
          setTimeout(() => {
            if (!this.lavalink.nodes.get('main').connected) {
              if (trys === this.settings.tryLavalink) {
                throw new Error('Lavalink connection failed. Please check that Lavalink is running.')
              }

              debug('Trying connect lavalink #%o', trys)
              this.lavalink.connect()
                .catch(() => {})
                .then((res) => {
                  if (res) debug('Lavalink connected')
                })
            }
          }, trys * 1000)
        }
      })
    } else debug('Music disabled, Skip Lavalink connect')
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
