const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot is alive 🚀");
});

const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});

console.log("Bot loaded...");

// 🤖 PREFIX SYSTEM
const PREFIX = "!";

app.get("/cmd", (req, res) => {
  let msg = req.query.msg;

  if (!msg) return res.send("Use !help (example: /cmd?msg=!help)");

  // remove prefix
  if (msg.startsWith(PREFIX)) {
    msg = msg.slice(PREFIX.length);
  }

  msg = msg.toLowerCase();

  if (msg === "help") {
    return res.send(`
🤖 Bot Commands:
!help - show commands
!ping - check bot
!info - bot info
    `);
  }

  if (msg === "ping") {
    return res.send("🏓 pong!");
  }

  if (msg === "info") {
    return res.send("😎 I am your Render bot with prefix system!");
  }

  res.send("❌ Unknown command. Try !help");
});
