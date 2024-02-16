let express = require("express");
require('dotenv').config();
let cors = require("cors");
let fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
let bodyParser = require("body-parser");


const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const PORT = process.env.PORT || 4000;


var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/home", async function (req, res) {
  res.send("welcome home");
});

app.get("/get_token", async function (req, res) {
  const params =
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code;

  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.error("error"));
});

app.listen(PORT, () => {
  console.log("cors server running on port ", PORT);
	console.log("serving ...");
});
