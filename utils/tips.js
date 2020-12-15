const tips = require('../data/tips.json')

function getTips (locale) {
  const target = tips[locale]
  if (!target) return 'TIPS_NOT_FOUND'

  return target[Math.floor(Math.random() * target.length)]
}

module.exports = { getTips }
