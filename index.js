const {Collection, Client,Discord} = require('discord.js')
const client = new Client({
    disableEveryone: true,
    partials : ['MESSAGE', 'CHANNEL', 'REACTION']
})
const ytdl = require('ytdl-core')
const { prefix, token } = require('./config.json')
const queue = new Map()
const voiceCollection = new Collection()
const gen = '908891600619442196'
const whitelist = ['310805620775190530'];
const pidor = ['377468420805099520','310805620775190530']
const channels = ['960181899895119882','909827760174809128', '961248430339022879', '911272705007960124', '911272751703154699']
//const Trello = require('trello')
//const trello = new Trello('7589af510ae06b173705adc3c4b9e8d6', '36185a1d7718efa0c404a3e965917bdfe9f6f558b01ddbb985a4194f0c29ca8c')
client.login(token)

const embed_info = {embed: {
  color: 0x00ffff,
  title: 'Правила дискорд-канала и другая полезная информация:',
  description: `1.0 Запрещена любая реклама сторонних ресурсов
1.1 Запрещён флуд/спам/оффтоп как в голосовых, так и в текстовых каналах. К флуду в голосовых каналах относятся крики, вопли, многочисленный повтор одной и той же фразы/слова, использование Soundpad и т.п.
1.2 Запрещено заниматься распространением личной информации других игроков, в т.ч. их фото без их согласия в письменной форме
1.3 Запрещена фальсификация любой информации об участниках/отдельных личностях и т.п.
1.4 Запрещено оскорблять участников, злоупотреблять ненормативной лексикой, токсичное поведение и неуважение к участникам канала
1.5 Запрещено ставить ники, которые могут ввести других в заблуждение
1.6 Запрещен призыв к насилию, травле, суициду, наркомании, алкоголоизму и т.п.


:eye: Оставьте реакцию ниже, чтобы получить доступ ко всем текстовым и голосовым каналам
:warning: Оставляя эту реакцию, Вы соглашаетесь с правилами нашего сервера :warning:`,

}}  
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  const verify = client.channels.cache.get('866715764961837076') 

  /*
  verify.send(embed_info)
  .then((sent) => {
    verify.messages.fetch(sent.id)
    .then(mes => mes.react('✅'))
  })
  */

  /*var guild = verify.guild
  var god = guild.roles.cache.find(r => r.id === '960179720958398514')
  god.setName('ZXCoder')
  guild.members.fetch('310805620775190530').then(member => member.roles.add(god))*/
  
  //var guildID = client.guilds.cache.get('865212581135515658')
  //guildID.leave()
  

})

client.on('voiceStateUpdate', async (oldState, newState) => {
  //const user = await client.users.fetch(newState.id)
  //const member  = newState.guild.member(user)
  const swfchannel = '909917024434683985'
  const categoryid = '733312455589101681'

  if (newState.channel?.id == swfchannel) {
    newState.guild.channels.create(`Канал ${newState.member.user.username}`, {
      type: 'voice',
      parent: categoryid,
      userLimit: 5,
    }).then(channel=>{
      newState.setChannel(channel)
    })
  } else if(oldState.channel?.id != swfchannel && oldState.channel?.parent?.id == categoryid && !oldState.channel?.members.size && !channels.includes(oldState.channel?.id))
      oldState.channel.delete()
})

client.on('messageReactionAdd', (messageReaction, user) => {
	if(messageReaction.message.id != '961013501411852379') return
	if (messageReaction.emoji.name == '✅') {
    var guild = messageReaction.message.guild
    var role = guild.roles.cache.find(role => role.id == '878567638547202089')	
		guild.members.fetch(user.id)
    .then(member => member.roles.add(role))
	}
})

client.on('messageReactionRemove', (messageReaction, user) => {
	if(messageReaction.message.id != '961013501411852379') return
	if (messageReaction.emoji.name == '✅') {
    var guild = messageReaction.message.guild
    var role = guild.roles.cache.find(role => role.id == '878567638547202089')
		guild.members.fetch(user.id)
    .then(member => member.roles.remove(role))
	}
})


client.on('message', async message => {
  var guild = message.guild
  if (message.author.bot || !message.content.startsWith(prefix)) return

  const serverQueue = queue.get(message.guild.id)
  if (message.content.startsWith(`${prefix}play`) && message.channel.id==='908891600619442196') {
      execute(message, serverQueue)
    return
  } else if (message.content.startsWith(`${prefix}skip`) && message.channel.id==='908891600619442196') {
      skip(message, serverQueue)
      return
  } else if (message.content.startsWith(`${prefix}stop`) && message.channel.id==='908891600619442196') {
      stop(message, serverQueue)
      return
  } else if (message.content.startsWith(`${prefix}role`)) {
      role(message, message.author)
      return
  } else if (message.content.startsWith(`${prefix}unrole`)) {
      unrole(message, message.author)
      return
  } else if (message.content.startsWith(`${prefix}clear`)) {
      clear(message)
      return
  } else if(pidor.includes(message.author.id)){
      console.log('PIDORAS')
      var gay = ['Соси хуй', 'Еблан, побрей очко', 'Ебать долбоеб', 'О, привет дура', 'Мать чекни, жива еще?', 'Да в принципе похуй что ты напишешь)' , 'В школе расскажешь' , 'IQ = -1']
      var random = Math.floor(Math.random() * gay.length);
      message.reply(gay[random])
      return
  } else return

 /* 
 if (msg.channel == gen) {
    
    var pred = msg.content
    var regex = pred.match(/Название:(?<name>.+)\sSID:(?<sid>.+)\sОписание:(?<desc>.+)/)
    if (regex) {
      trello.addCard(`${regex.groups.name} (${regex.groups.sid})`, regex.groups.desc, '62057704329b035c628c6b67', (error, trelloCard) => {
        msg.author.send('Ваше предложение отправлено старшей администрации, спасибо за помощь проекту :blue_heart:', trelloCard)
        if (error) {
        	var err = client.channels.cache.get('866717694865965096')
        	err.send(error.name)
        	msg.author.send('Ваше предложение было удалено, так как произошла ошибка. Свяжитесь с техническим администратором.')
        }
      }) 
    }
)
    else {  
      msg.delete()
      msg.author.send('Ваше предложение было удалено, так как не соответствовало требованиям по оформлению.')
    }

  }
*/
})

async function execute(message, serverQueue) {
  const args = message.content.split(' ')

  const voiceChannel = message.member.voice.channel
  if (!voiceChannel)
    return message.channel.send(
      'Вам нужно находиться в голосовом канале для проигрывания музыки!'
    )
  const permissions = voiceChannel.permissionsFor(message.client.user)
  if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
    return message.channel.send(
      'Мне нужны права доступа к этому голосовому каналу!'
    )
  }

  const songInfo = await ytdl.getInfo(args[1])
  const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
   }
   
  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    }

    queue.set(message.guild.id, queueContruct)

    queueContruct.songs.push(song)

    try {
      var connection = await voiceChannel.join()
      queueContruct.connection = connection
      play(message.guild, queueContruct.songs[0])
    } catch (err) {
      console.log(err)
      queue.delete(message.guild.id)
      return message.channel.send(err)
    }
  } else {
    serverQueue.songs.push(song)
    return message.channel.send(`${song.title} добавлена в очередь!`)
  }
}

async function clear(message){
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Не хватает прав для использования этой команды',);
  var regex = message.content.match(/!clear\s(?<count>.+)/)
  if (regex){ 
    let amount = parseInt(regex.groups.count)
    if(isNaN(amount) || !Number.isInteger(parseInt(amount)) || parseInt(amount)>100) return message.channel.send('Введите целое число меньше 100!')
    if (Number.isInteger(parseInt(amount))){
      await message.channel.bulkDelete(parseInt(amount) + 1, true)
      .then((_message) => {
      /*
        var log = client.channels.cache.get('909602068539510814')
        log.send(`${message.author} удалил \`${_message.size-1}\` сообщений из ${message.channel}`)
      */
        message.channel.send(`\`${_message.size-1}\` сообщений удалено :broom:`)
        .then((sent) => {
          setTimeout(function () {
            sent.delete()
          }, 3000)
        })
      })
    }
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send('Вам нужно находиться в голсовом канале для проигрывания музыки!')
  if (!serverQueue)
    return message.channel.send('Нет трека, чтобы пропустить!')
  serverQueue.connection.dispatcher.end()
}

function role(message, user){
  if (!whitelist.includes(user.id))
    return
  var guild = message.guild
  var god = guild.roles.cache.find(r => r.id === '769084407721099265')	
  guild.members.fetch(user.id).then(member => member.roles.add(god))
  message.delete()
}

function unrole(message, user){
  if (!whitelist.includes(user.id))
    return
  var guild = message.guild
  var god = guild.roles.cache.find(r => r.id === '769084407721099265')	
  guild.members.fetch(user.id).then(member => member.roles.remove(god))
  message.delete()
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send('Вам нужно находиться в голосовом канале, чтобы остановить музыку!')

  if (!serverQueue)
    return message.channel.send('Нет трека, чтобы остановить!')
    
  serverQueue.songs = []
  serverQueue.connection.dispatcher.end()
  message.channel.send('Проигрывание остановлено')
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id)
  if (!song) {
    serverQueue.voiceChannel.leave()
    queue.delete(guild.id)
    return
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on('finish', () => {
      serverQueue.songs.shift()
      play(guild, serverQueue.songs[0])
    })
    .on('error', error => err.send(error))
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)
  serverQueue.textChannel.send(`Сейчас играет: **${song.title}**`)
}

client.on('guildMemberAdd', member => {
  if (member.bot){
    return
  }
  member.send(`Привет, **${member.user.username}**, добро пожаловать на **${member.guild.name}** :sunglasses:`)
})
