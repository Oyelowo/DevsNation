const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const www = process.env.WWW || "./";

app.use(express.static(www));

console.log(`serving ${www}`);

app.get("/", (req, res) => res.send("Hellrero"));

app.listen(port, (req, res) => {
  console.log(`listening on port${port}`);
});
