app.get("/:cmd", (req, res) => {
  let msg = req.params.cmd.toLowerCase();

  let parts = msg.split(" ");
  let main = parts[0];

  // HELP
  if (main === "help") {
    return res.send(commands.help);
  }

  // PING
  if (main === "ping") {
    return res.send(commands.ping);
  }

  // CMD SYSTEM
  if (main === "cmd") {
    let sub = parts[1];

    if (sub === "install") {
      let name = parts[2];
      let text = parts.slice(3).join(" ");
      if (!name || !text) return res.send("Usage: cmd install <name> <text>");

      commands[name] = text;
      return res.send(`✅ Installed "${name}"`);
    }

    if (sub === "load") {
      let name = parts[2];
      return res.send(commands[name] || "❌ Not found");
    }

    if (sub === "unload") {
      let name = parts[2];
      delete commands[name];
      return res.send(`🗑️ Removed "${name}"`);
    }
  }

  // CUSTOM COMMANDS
  if (commands[main]) {
    return res.send(commands[main]);
  }

  res.send("❌ Unknown command");
});
