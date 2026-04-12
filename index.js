const express = require("express");
const login = require("fca-unofficial");

const app = express();

app.get("/", (req, res) => {
  res.send("Bot is running");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});

const appState = JSON.parse(process.env.FBSTATE);

login({ appState }, (err, api) => {
  if (err) return console.error("LOGIN ERROR:", err);

  console.log("Bot logged in");

  api.listenMqtt((err, event) => {
    if (err) return console.error(err);

    console.log("EVENT:", event);

    if (event.type === "message") {
      api.sendMessage("yo 👀", event.threadID);
    }
  });
});
