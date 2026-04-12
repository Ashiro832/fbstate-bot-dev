const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot is alive 🚀");
});

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("Server running");
});
