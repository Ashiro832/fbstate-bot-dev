const login = require("facebook-chat-api");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// 🔐 FBSTATE from Render env
const fbState = JSON.parse(process.env.FBSTATE);

// 📜 Commands
const commands = {
  help: `📜 COMMANDS\n\n!help\n!ping\n!hello`,
  ping: "🏓 pong!",
  hello: "👋 Hello bro!"
};

// 🌐 Keep Render alive
app.get("/", (req, res) => {
  res.send("Messenger bot running 🚀");
});

// 🤖 LOGIN TO FACEBOOK
login({ appState: fbState }, (err, api) => {
  if (err) return console.log("Login failed:", err);

  console.log("✅ Bot connected to Messenger");

  api.listenMqtt((err, event) => {
    if (err) return console.log(err);
    if (event.type !== "message") return;
    if (!event.body) return;

    let msg = event.body.toLowerCase();

    if (!msg.startsWith("!")) return;

    let args = msg.slice(1).split(" ");
    let cmd = args[0];

    if (cmd === "help") {
      return api.sendMessage(commands.help, event.threadID);
    }

    if (cmd === "ping") {
      return api.sendMessage(commands.ping, event.threadID);
    }

    if (cmd === "hello") {
      return api.sendMessage(commands.hello, event.threadID);
    }
  });
});

// 🚀 START SERVER (RENDER REQUIRED)
app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});
