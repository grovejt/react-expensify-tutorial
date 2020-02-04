const express = require("express");
const path = require("path");
const app = express();

const prodPath = path.join(__dirname, "..", "build");
console.log("prodPath", prodPath);

app.use(express.static(prodPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(prodPath, "index.html"));
});

app.listen(3012, () => {
  console.log("Server is up.");
});
