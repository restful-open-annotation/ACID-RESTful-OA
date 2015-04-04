"use strict";

//var assert = require('assert');
var _ = require("lodash");
var tv4 = require('tv4');

//-------------------------------------------------------------------------

exports.addJsonSchema = function (uri, schema) {
  tv4.addSchema(uri, schema);
};

function validationErrorToString(e) {
  return (e.dataPath) ? e.dataPath + " -- " + e.message : e.message;
}

exports.validateJsonSyntax = function (json, schemaUri) {
  var schema = tv4.getSchema(schemaUri);
  var ret = tv4.validateMultiple(json, schema, true);
  return {
    valid: ret.valid,
    errors: _.map(ret.errors, validationErrorToString),
    missing: _.map(ret.missing, validationErrorToString) };
};
