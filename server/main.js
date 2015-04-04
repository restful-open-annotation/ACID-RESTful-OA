"use strict";

var express = require('express');
var app = express();
//var assert = require('assert');
//var _ = require("lodash");
var serverLib = require("./lib.js");

//-------------------------------------------------------------------------

var server = app.listen(process.env.PORT || 3000, function () {

  //var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', "localhost", port);
});

//-------------------------------------------------------------------------

app.use("/public", express.static('public'));

app.get('/', function (req, res) {
  res.sendFile("index.html", { root: "./" });
});

app.get('/jsonSchema', function (req, res) {
  serverLib.getJsonSchema(function (error, data) {
    if (error) { res.status(500).send(error); }
    else { res.send(data); }
  });
});

app.get('/get', function (req, res) {
  var url = req.query.url;
  if (!url) {
    res.status(400).send("You must provide a url parameter");
  }
  else {
    serverLib.getJson(
      url,
      function (error, data) {
        if (error) { res.status(400).send(error); }
        else { res.send(data); }
      });
  }
});
