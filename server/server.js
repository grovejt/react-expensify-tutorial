const express = require("express");
const path = require("path");
const app = express();

// get PORT from environment variable is provided (e.g. from Heroku):
const port = process.env.PORT || 3012;
console.log("port", port);

const prodPath = path.join(__dirname, "..", "build");
console.log("prodPath", prodPath);

app.use(express.static(prodPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(prodPath, "index.html"));
});

app.listen(port, () => {
  console.log("Server is up.");
});
