const express = require("express");
const mongoose = require("mongoose");

const app = express();

// DB Config
//const db = require("./config/keys").mongoURI;

const { mongoURI: db } = require("./config/keys");

// Connect to MongoDB

mongoose.connect(db).then(()=> console.log("mongoDB connected")).catch(err => console.log('err'));

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hellokekk"));

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
