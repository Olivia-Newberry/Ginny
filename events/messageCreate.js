module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(client.config.prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  let cmd = client.commands.get(command);

  // Check user permissions
  let can_manage_messages = false;
  if(typeof(message.channel.permissionsFor) === "function") can_manage_messages = message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES", false);

  // If that command doesn't exist, check adminCommands
  if (!cmd && can_manage_messages){
    cmd = client.adminCommands.get(command);
  }

  // If no admin commands, exit silently
  if (!cmd)
    return;

  if(!can_manage_messages){
    //check for command cooldown
    if(client.commandCooldown.has(message.author.id))
      return;

    // Adds the user to the set so that they can't talk for 2.5 seconds
    client.commandCooldown.add(message.author.id);
    setTimeout(() => {
      // Removes the user from the set after 2.5 seconds
      client.commandCooldown.delete(message.author.id);
    }, 2500);
  }

  // Run the command
  cmd.run(client, message, args);
};
