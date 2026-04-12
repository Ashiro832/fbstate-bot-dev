const express = require("express");
const login = require("fca-unofficial");

const app = express();

app.get("/", (req, res) => {
  res.send("Bot is alive...");
});

// ⚡ START SERVER FIRST (IMPORTANT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

// ⚡ LOGIN RUNS AFTER (NON-BLOCKING STYLE)
setTimeout(() => {
  let appState;

  try {
    appState = JSON.parse(process.env.FBSTATE);
  } catch (e) {
    return console.error("FBSTATE ERROR:", e.message);
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

}, 2000); // small delay prevents Render timeout
