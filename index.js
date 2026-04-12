const express = require("express");
const login = require("fca-unofficial");

const app = express();

// 🌐 Web server (IMPORTANT for Render)
app.get("/", (req, res) => {
  res.send("Bot is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

// 🤖 FBSTATE LOGIN
let appState;

try {
  appState = JSON.parse(process.env.FBSTATE);
} catch (e) {
  console.error("FBSTATE ERROR");
}

login({ appState }, (err, api) => {
  if (err) return console.error("LOGIN ERROR:", err);

  console.log("Bot logged in");

  api.listenMqtt((err, event) => {
    if (err) return console.error(err);

    if (event.type === "message") {
      api.sendMessage("yo 👀", event.threadID);
    }
  });
});
