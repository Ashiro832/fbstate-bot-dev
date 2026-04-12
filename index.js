const express = require("express");
const app = express();

// Render gives this automatically
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("Bot is alive 🚀");
});

// IMPORTANT: bind to 0.0.0.0
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
