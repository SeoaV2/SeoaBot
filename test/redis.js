const Redis  = require('redis')

const musicdb = new Redis.createClient(6379,'127.0.0.1')
musicdb.on('ready', () => console.log("redis ready"))
musicdb.on('connect', () => console.log('redis connect'))
musicdb.rpush('fruits', 'apple', 'orange', 'apple')
musicdb.lpush('fruits', 'banana', 'pear');
musicdb.lrange('fruits', 0, -1, (err, arr) => {
  console.log(arr); // ['pear', 'banana', 'apple', 'orange', 'apple']
});

musicdb.del('fruits');