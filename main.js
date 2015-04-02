"use strict";

var $ = require('jquery');
window.$ = window.jQuery = $;
var bootstrap = require('bootstrap');

var assert = require('assert');
var _ = require("lodash");
var request = require("request");
var React = require("react");
var Main = require("./views/main.jsx");
var tv4 = require('tv4');
var JaySchema = require('jayschema');
var jsonSchema = new JaySchema();

//-------------------------------------------------------------------------

var SCHEMA_URI = 'https://raw.githubusercontent.com/restful-open-annotation/schema/master/json-schema-basic.json';
var testUris = _.slice(process.argv, 2);

//-------------------------------------------------------------------------

React.render(
  React.createElement(Main, {
    name: "Juan Miguel Cejuela"
  }),
  document.getElementById('webapp'));

// request(SCHEMA_URI, function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//         tv4.addSchema(SCHEMA_URI, body);
//     }
// });

// _.forEach(testUris, function (oajsonldUri) {
//     request(oajsonldUri, function (error, response, body) {
//         if (!error && response.statusCode === 200) {
//             var schema = tv4.getSchema(SCHEMA_URI);
//             console.log('synchronous result:', jsonSchema.validate({}, schema));
//         }
//         else {
//             console.log("ERROR");
//         }
//     });
//});
