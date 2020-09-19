const { resolve: path } = require('path')
const { Client } = require('discord.js')
const { existsSync } = require('fs')
const { readRecursively } = require('../utils/readFiles')
const { I18n } = require('i18n')
const knex = require('knex')

class eClient extends Client {
  constructor () {
    super()
    this._ = {}

    this._settingPath = path() + '/config.json'
    this._settingHas = existsSync(this._settingPath)

    if (this._settingHas) {
      const {
        token = process.env.TOKEN,
        prefix = (process.env.PREFIX || '>'),
        ...settings
      } = require(this._settingPath)

      if (!token) throw new Error('Token not provided')
      this.settings = { token, prefix, ...settings }
    }

    this._commandsPath = path() + '/commands'
    this._commandsHas = existsSync(this._commandsPath)

    if (this._commandsHas) {
      this.commands = []
      readRecursively(this._commandsPath)
        .forEach((command) => {
          if (!command.endsWith('.js')) return

          command = require(command)
          this.commands.push(command)
        })
    } else throw new Error('./commands/ folder not exists')

    this.db = knex({ client: 'mysql', connection: this.settings.database || { user: 'seoafixed', host: 'localhost', database: 'seoafixed' } })
    this.i18n = new I18n({ objectNotation: true, directory: path() + '/locales' })
  }

  start (token = this.settings.token) {
    this.login(token)
  }

  regist (event = 'ready', exec = () => {}) {
    this.on(event, (...args) => {
      exec(this, ...args)
    })
  }
}

module.exports = eClient
