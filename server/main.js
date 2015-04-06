"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
//var assert = require('assert');
//var _ = require("lodash");
var slib = require("./lib.js");
var lib = require("../src/lib.js");

//-------------------------------------------------------------------------

var server = app.listen(process.env.PORT || 3000, function () {

  //var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', "localhost", port);
});

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

//-------------------------------------------------------------------------

app.use("/public", express.static('public'));

app.get('/', function (req, res) {
  res.sendFile("index.html", { root: "./" });
});

app.get('/jsonSchema', function (req, res) {
  slib.getJsonSchema(function (error, data) {
    if (error) { res.status(500).send(error); }
    else { res.send(data); }
  });
});

var JSON_SCHEMA_URI;

slib.getJsonSchema(function (error, data) {
  if (error) { console.error("Couldn't get the json schema"); }
  else {
    lib.addJsonSchema(data.uri, data.schema);
    JSON_SCHEMA_URI = data.uri;
  }
});

app.post('/validate', function (req, res) {
  var jsonld = req.body;
  var ret = lib.validateJsonSyntax(jsonld, JSON_SCHEMA_URI);
  res.send(ret);
});

app.get('/get', function (req, res) {
  var url = req.query.url;
  if (!url) {
    res.status(400).send("You must provide a url parameter");
  }
  else {
    slib.getJson(
      url,
      function (error, data) {
        if (error) { res.status(400).send(error); }
        else { res.send(data); }
      });
  }
});
