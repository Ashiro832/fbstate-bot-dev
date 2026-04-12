const express = require("express");
const app = express();

// 🌐 Web server (REQUIRED for Render)
app.get("/", (req, res) => {
  res.send("Bot is alive on Render 🚀");
});

// 🚨 IMPORTANT: Render PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

// 🤖 OPTIONAL BOT LOGIC PLACEHOLDER
console.log("Bot script loaded...");
