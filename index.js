const express = require("express");
const login = require("fca-unofficial");

const app = express();
const PORT = process.env.PORT || 3000;

// keep server alive
app.get("/", (req, res) => {
  res.send("Bot is running!");
});

app.listen(PORT, () => {
  console.log("Server is live on port " + PORT);
});

// your FBSTATE here
const state = JSON.parse(process.env.FBSTATE);

login({ appState: state }, (err, api) => {
  if (err) return console.error(err);

  console.log("✅ Logged in!");

  api.listenMqtt((err, message) => {
    if (err) return console.error(err);
    if (!message.body) return;

    console.log("📩", message.body);

    if (message.body === "!help") {
      api.sendMessage("Hello! I'm working 😎", message.threadID);
    }
  });
});
