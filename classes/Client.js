const path = require('path').resolve()
const { Client } = require('discord.js')
const { existsSync } = require('fs')
const { startLavalink, startMariadb } = require('../utils/shell')
const { Manager: Lavalink } = require('@lavacord/discord.js')
const { readRecursively } = require('../utils/readFiles')
const { I18n } = require('i18n')
const knex = require('knex')
const debug = require('debug')('seoabot:client')

class eClient extends Client {
  constructor () {
    debug('Starting up')

    super()
    this._ = {}

    debug('Check the existance of %o', 'config.json')
    this._settingPath = path + '/config.json'
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

    startMariadb()
    startLavalink()

    debug('Initialize database')
    this.db = knex({ client: 'mysql', connection: this.settings.database || { user: 'seoafixed', host: 'localhost', database: 'seoafixed' } })
    this.i18n = new I18n({ objectNotation: true, directory: path + '/locales' })
    this.lavalink = new Lavalink(this, [{ id: 'main', host: 'localhost', port: 2333, password: 'passwd' }])

    this.on('ready', () => {
      for (let trys = 0; trys < (this.settings.tryLavalink + 1 || 11); trys++) {
        setTimeout(() => {
          if (!this.lavalink.nodes.get('main').connected) {
            if (trys === (this.settings.tryLavalink || 10) && !process.env.disableExitOnFail) {
              throw new Error('lavalink connection failed, restart this bot to continue\nuse disableExitOnFail=true to disable this message')
            }
            debug('Trying connect lavalink #%o', trys + 1)
            this.lavalink.connect().catch(() => {}).then((res) => { if (res) debug('Lavalink connected') })
          }
        }, trys * 1000)
      }
    })
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
