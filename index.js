const Client = require('./classes/Client')
const client = new Client()

const onReady = require('./events/onReady')
const onMessage = require('./events/onMessage')
//const musicEnd = require('./events/musicEnd')

client.start()
client.regist('ready', onReady)
client.regist('message', onMessage)
// idk music end loop (Tmfoem?)
client.on('message', (msg) => {
    let users = client.db.select('denylist').from('userdata').where('denylist', msg.author.id)
    if (users) return
  // let player = client.lavalink.players.get(msg.guild.id)
  //  if (!player) return
  //  musicEnd(Client, player)
})