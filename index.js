const express = require("express");
const login = require("fca-unofficial");

const app = express();

app.get("/", (req, res) => {
  res.send("Bot is alive...");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

// 🔑 SAFER FBSTATE PARSE
let appState;
try {
  if (!process.env.FBSTATE) {
    console.error("FBSTATE is missing in environment variables");
  } else {
    appState = JSON.parse(process.env.FBSTATE);
  }
} catch (e) {
  console.error("FBSTATE JSON ERROR:", e.message);
}

// 🤖 LOGIN
login({ appState }, (err, api) => {
  if (err) {
    console.error("LOGIN ERROR:", err);
    return;
  }

  console.log("Bot logged in successfully");

  api.listenMqtt((err, event) => {
    if (err) {
      console.error("LISTEN ERROR:", err);
      return;
    }

    if (event.type === "message") {
      api.sendMessage("yo 👀", event.threadID);
    }
  });
});
