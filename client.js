"use strict";

var $ = require('jquery');
window.$ = window.jQuery = $;
//var bootstrap =
require('bootstrap');

//var assert = require('assert');
//var _ = require("lodash");
var React = require("react");
var Main = require("./views/Main.jsx");

React.render(
  React.createElement(Main, {

  }),
  document.getElementById('webapp'));
