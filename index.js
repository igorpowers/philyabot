const Discord = require("discord.js")
const client = new Discord.Client()
const ytdl = require('ytdl-core');
const { prefix, token } = require("./config.json");
const queue = new Map();
const gen = "866752743293190145"
const test = "907416624938778655"
const err = client.channels.cache.get("866717694865965096")
//const Trello = require("trello")
//const trello = new Trello("7589af510ae06b173705adc3c4b9e8d6", "36185a1d7718efa0c404a3e965917bdfe9f6f558b01ddbb985a4194f0c29ca8c")
client.login(token)

const embed_info = {embed: {
  color: 0x00ffff,
  title: "Правила дискорд-канала и другая полезная информация:",
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

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  let channel = client.guilds.cache.get("733312455589101679").channels.cache.get("866715764961837076")
	channel.messages.fetch('878567417939394560')
  const verify = client.channels.cache.get("866715764961837076") 
  //verify.send(embed_info)
  verify.messages.fetch("878567417939394560")
  .then(mes => mes.react('✅'))

  
}) 

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});


client.on('messageReactionAdd', (messageReaction, user) => {
	if(messageReaction.message.id != "878567417939394560") return;
	if (messageReaction.emoji.name == "✅") {
    var guild = messageReaction.message.guild
    var role = guild.roles.cache.find(role => role.name === "Verified")	
		guild.members.fetch(user.id).then(member => member.roles.add(role))
	}
})

client.on('messageReactionRemove', (messageReaction, user) => {
	if(messageReaction.message.id != "878567417939394560") return;
	if (messageReaction.emoji.name == "✅") {
    var guild = messageReaction.message.guild
    var role = guild.roles.cache.find(role => role.name === "Verified")
		guild.members.fetch(user.id).then(member => member.roles.remove(role))
	}
})

client.on("message", async message => {

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (message.content === "!role")
  {
    var guild = message.guild
    var god = guild.roles.cache.find(r => r.id === "769084407721099265")	
    guild.members.fetch(user.id).then(member => member.roles.add(god))
    message.channel.send("Yes")
  }
  else if ( message.content === "!unrole")
  {
    var guild = message.guild
    var god = guild.roles.cache.find(r => r.id === "769084407721099265")	
    guild.members.fetch(user.id).then(member => member.roles.remove(god))
    message.channel.send("No")
  }

  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}play`)) {
      execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
      skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
      stop(message, serverQueue);
    return;
  } else if (message.content,startWith(`${prefix}role`)) {
      role();
      return;
  } else if (message.content,startWith(`${prefix}unrole`)) {
      unrole();
      return;
  } else {
    return;
    //message.channel.send("Введи правильную команду!");
  }
  /*
  if (msg.channel == gen && !msg.author.bot) {
    var pred = msg.content
    var regex = pred.match(/Название:(?<name>.+)\sSID:(?<sid>.+)\sОписание:(?<desc>.+)/)
    if (regex) {
      trello.addCard(`${regex.groups.name} (${regex.groups.sid})`, regex.groups.desc, "60c30d181acf602aa3fc2c66", (error, trelloCard) => {
        msg.author.send("Ваше предложение отправлено старшей администрации, спасибо за помощь проекту :blue_heart:", trelloCard)
        if (error) {
        	var err = client.channels.cache.get("866717694865965096")
        	err.send(error.name)
        	msg.author.send("Ваше предложение было удалено, так как произошла ошибка. Свяжитесь с техническим администратором.")
        }
      }) 
    }
    else {  
      msg.delete()
      msg.author.send("Ваше предложение было удалено, так как не соответствовало требованиям по оформлению.")
    }

  }
  
  if (message.member.roles.find(role => role.name === 'Гей ебаный'))
  {
    var mas = msg.content
    var regex = mas.match(/!nick\s(?<name>.+)\s(?<newname>.+)/)
    if (regex)
    {
      var chan = client.guilds.cache.get("733312455589101679").channels.cache.get("907416624938778655")
      var id = client.users.cache.find(u => u.tag === `${regex.groups.name}`).id
      msg.channel.send(`Ник ${regex.groups.name} изменен на ${regex.groups.newname}`)
      var mentionedMember = chan.guild.members.cache.get(id)
      mentionedMember.setNickname(`${regex.groups.newname}`)
    }
  }*/
})

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "Вам нужно находиться в голосовом канале для проигрывания музыки!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "Мне нужны права доступа к этому голосовому каналу!"
    );
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url,
   };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} добавлена в очередь!`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Вам нужно находиться в голсовом канале для проигрывания музыки!"
    );
  if (!serverQueue)
    return message.channel.send("Нет трека, чтобы пропустить!");
  serverQueue.connection.dispatcher.end();
}
function role()
{
  var guild = message.guild
  var god = guild.roles.cache.find(r => r.id === "769084407721099265")	
  guild.members.fetch(user.id).then(member => member.roles.add(god))
  message.channel.send("Added")
}

function unrole()
{
  var guild = message.guild
  var god = guild.roles.cache.find(r => r.id === "769084407721099265")	
  guild.members.fetch(user.id).then(member => member.roles.remove(god))
  message.channel.send("Deleted")
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "Вам нужно находиться в голосовом канале, чтобы остановить музыку!"
    );
    
  if (!serverQueue)
    return message.channel.send("Нет трека, чтобы остановить!");
    
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
  message.channel.send("Проигрывание остановлено")
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => err.send(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Сейчас играет: **${song.title}**`);
}

client.on("guildMemberAdd", member => {
  if (member.bot){
    return
  }
  
  member.send(`Привет, **${member.user.username}**, добро пожаловать на **${member.guild.name}** :sunglasses:`)
})
