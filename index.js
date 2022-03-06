const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const sqlite3 = require('sqlite3').verbose();
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
client.config = config;
const logger = require("./modules/Logger.js");

client.commandCooldown = new Set();
client.commands = new Collection();
client.adminCommands = new Collection();
client.db = new sqlite3.Database('./DB/sqlite.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to tags database.');
  }
});
client.runSQL = async function (sql,params=[]){
	return new Promise((resolve,reject) =>{
		client.db.run(sql, params, function(err){
			if (err) {
				console.log('Error running sql ' + sql)
				console.log(err)
				reject(err)
			} else {
				resolve({ id: this.lastID })
			}
		})
	})
}  
client.getSQL = async function(sql,params=[]){
	return new Promise((resolve,reject) =>{
		client.db.get(sql, params, function(err,result){
			if (err) {
				console.log('Error running sql ' + sql)
				console.log(err)
				reject(err)
			} else {
				resolve(result)
			}
		})
	})
}  
client.allSQL = async function(sql,params=[]){
	return new Promise((resolve,reject) =>{
		client.db.all(sql, params, function(err,rows){
			if (err) {
				console.log('Error running sql ' + sql)
				console.log(err)
				reject(err)
			} else {
				resolve(rows)
			}
		})
	})
}  
client.removeTag = async function(tag){
	await client.runSQL(`DELETE FROM tags WHERE tag = ?`, [tag]);
}
client.addTag = async function(tag){
	await client.runSQL('INSERT INTO tags (tag) VALUES (?)', [tag])
}
client.lsTags = async function(){
	await client.allSQL('SELECT tag FROM tags');
}
let sql = `
  CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tag TEXT
  )`;
client.runSQL(sql);
sql = `
  CREATE TABLE IF NOT EXISTS userData (
    userID INTEGER,
    tagID INTEGER,
    value TEXT
  )`;
client.runSQL(sql);


const init = async () => {
  // const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
  // for (const file of commands) {
  //   const commandName = file.split(".")[0];
  //   const command = require(`./commands/${file}`);
  //   console.log(`Attempting to load command ${commandName}`);
  //   client.commands.set(commandName, command);
  // }
  const commands = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
  for (const file of commands) {
    const props = require(`./commands/${file}`);
    logger.log(`Loading Command: ${props.help.name}. 👌`, "log");
    client.container.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.container.aliases.set(alias, props.help.name);
    });
  }
  const adminCommands = fs.readdirSync("./adminCommands/").filter(file => file.endsWith(".js"));
  for (const file of adminCommands) {
    const props = require(`./adminCommands/${file}`);
    logger.log(`Loading Command: ${props.help.name}. 👌`, "log");
    client.container.adminCommands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.container.aliases.set(alias, props.help.name);
    });
  }

  // const adminCommands = fs.readdirSync("./adminCommands").filter(file => file.endsWith(".js"));
  // for (const file of adminCommands) {
  //   const adminCommandName = file.split(".")[0];
  //   const adminCommand = require(`./adminCommands/${file}`);
  //   console.log(`Attempting to load admin command ${adminCommandName}`);
  //   client.adminCommands.set(adminCommandName, adminCommand);
  // }

  const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
  for (const file of events) {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  }
  client.on("threadCreate", (thread) => thread.join());

  client.login(config.token);
};

init();
