let express = require("express");
require('dotenv').config();
let cors = require("cors");
let fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
let bodyParser = require("body-parser");


const DEV_ENV = process.env.DEV_ENV || "prod";


let CLIENT_ID;
let CLIENT_SECRET;

if (DEV_ENV === "prod") {
	CLIENT_ID = process.env.CLIENT_ID;
	CLIENT_SECRET = process.env.CLIENT_SECRET;
} else {
	CLIENT_ID = process.env.CLIENT_ID_TEST;
	CLIENT_SECRET = process.env.CLIENT_SECRET_TEST;
}

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

	if (DEV_ENV === 'test')
	console.log("params are : ", params);


  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
		if (DEV_ENV === "test")
				console.log("data was fetched", data)
      res.json(data);
    })
    .catch((err) => console.error("error"));
});

app.listen(PORT, () => {
  console.log("cors server running on port ", PORT);
	console.log("serving ...");
});
