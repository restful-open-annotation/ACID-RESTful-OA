"use strict";

//var assert = require('assert');
var _ = require("lodash");
var request = require("request");

//-------------------------------------------------------------------------

var SCHEMA_PREFIX_URI = "https://raw.githubusercontent.com/restful-open-annotation/schema/master/";

//-------------------------------------------------------------------------

exports.getJsonSchema = function (callback, schemaName) {
  schemaName = schemaName || "json-schema-basic.json";
  var uri = SCHEMA_PREFIX_URI + schemaName;

  request(uri, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      callback(null, {
        uri: uri,
        schema: JSON.parse(body) });
    }
    else {
      callback(error);
    }
  });
};

exports.getJson = function (url, callback) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var jsonld = body;
      if (typeof jsonld !== "object") {
        try {
          jsonld = JSON.parse(body);
        } catch (e) {
          callback(e);
        }
      }
      callback(null, jsonld);
    }
    else {
      callback(error);
    }
  });
};
