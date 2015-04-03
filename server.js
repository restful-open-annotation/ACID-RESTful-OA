"use strict";

var express = require('express');
var app = express();
var assert = require('assert');
var _ = require("lodash");
var main = require("./server/main.js");

//-------------------------------------------------------------------------

app.listen(3000);

//-------------------------------------------------------------------------

app.use("/public", express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/jsonSchema', function (req, res) {
  main.getJsonSchema(function (error, data) {
    if (error) { res.status(500).send(error); }
    else { res.send(data); }
  });
});
