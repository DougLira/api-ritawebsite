const express = require("express"),
  app = express(),
  consign = require("consign"),
  bodyParser = require("body-parser"),
  cors = require("cors");

if (process.env.NODE_ENV === 'development') {
  app.set("mailgun_email", "dodo_1828@hotmail.com");
} else {
  app.set("mailgun_email", "ritacassiamiro@gmail.com");
}

app.set("secret", "comoumdiadedomingo");

app.options("*", cors());

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader("ACCESS-CONTROL-ALLOW-ORIGIN", "*");

  // Request methods you wish to allow
  res.setHeader("ACCESS-CONTROL-ALLOW-METHODS", "GET, POST, PUT, DELETE");

  // Request headers you wish to allow
  res.setHeader("ACCESS-CONTROL-ALLOW-HEADERS", "Content-type, x-access-token");

  // List of headers that are to be exposed to the XHR front-end object
  res.setHeader("ACCESS-CONTROL-EXPOSE-HEADERS", "x-access-token");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("ACCESS-CONTROL-ALLOW-CREDENTIALS", true);

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('./uploads'));

consign({
    cwd: "app"
  })
  .include("models")
  .then("api")
  .then("routes/site.js")
  .then("routes/auth.js")
  .then("routes")
  .into(app);

module.exports = app;