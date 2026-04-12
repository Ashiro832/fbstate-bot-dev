const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot is alive 🚀");
});

const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});
