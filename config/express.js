const express = require("express"),
  app = express(),
  consign = require("consign"),
  expressaValidator = require("express-validator"),
  bodyParser = require("body-parser"),
  cors = require("cors");

app.set("secret", "comoumdiadedomingo");

app.options("*", cors());

app.use(bodyParser.raw({ type: "application/octet-stream", limit: "500mb" }));
app.use(bodyParser.json({ type: "*/*", limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));

app.use(expressaValidator());

// Add headers
app.use(function(req, res, next) {
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

consign({ cwd: "app" })
  .include("models")
  .then("api")
  .then("routes/site.js")
  .then("routes/auth.js")
  .then("routes")
  .into(app);

module.exports = app;
