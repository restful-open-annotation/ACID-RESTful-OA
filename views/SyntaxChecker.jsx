"use strict";

var _ = require('lodash');
var React = require('react');
var SeeAPI = require('./SeeAPI.jsx');
var Loader = require('react-loader');
var lib = require('../src/lib.js');
var $ = require('jquery');

//-------------------------------------------------------------------------

var JSON_SCHEMA_URI;
$.get("jsonSchema")
 .done(function (x) {
   lib.addJsonSchema(x.uri, x.schema);
   JSON_SCHEMA_URI = x.uri;
 });

function errorItem(e, index) {
  return <li key={index}>{e.toString()}</li>;
}

function errorItems(array) {
  return <ul>{_.map(array, errorItem)}</ul>;
}

module.exports = React.createClass({
  getInitialState: function () {
    return {
      loaded: true,
      toBeChecked: "",
      success: "",
      errors: "",
      warnings: ""
    };
  },

  setToBeChecked: function () {
    this.setState({
      toBeChecked: this.refs.content.getDOMNode().value,
      success: "",
      errors: "",
      warnings: ""
    });
  },

  checkAndReact: function (jsonld) {
    var ret = lib.validateJsonSyntax(jsonld, JSON_SCHEMA_URI);

    this.setState({
      loaded: true,
      success: (ret.valid) ? "OK!" : "",
      errors: errorItems(ret.errors),
      warnings: errorItems(ret.missing)
    });
  },

  check: function () {
    var self = this;
    this.setState({loaded:false});
    var submitted = self.state.toBeChecked;
    try {
      this.checkAndReact(JSON.parse(submitted));
    } catch (e) {
      $.get("get", { url: submitted })
       .done(function (jsonld) {
         self.setState({ toBeChecked: JSON.stringify(jsonld, null, 2) });
         self.checkAndReact(jsonld);
       })
       .fail(function () {
         self.setState({
           loaded: true,
           success: "",
           errors: "The input is wrong or the url could not be loaded",
           warnings: ""
         });
         return;
       });
    }
  },

  render: function () {
    //var self = this;
    return (
      <div id="syntaxChecker">
        <div>
          <button className="btn btn-success" onClick={this.check} disabled={this.state.toBeChecked === ""} style={{margin: "0 3px 3px 0"}}>Validate</button>
          <SeeAPI API={function (origin) { return 'curl -H "Content-Type: application/ld+json" -X POST -d \'{"your":"json"}\' '+origin+'/validate'; }} />
        </div>
        <textarea ref="content" placeholder="Paste here your json-ld or a GET endpoint" onChange={this.setToBeChecked} value={this.state.toBeChecked} />
        <div>
          <Loader loaded={this.state.loaded} top="120%">
            <div className="result">
              <div className="success">{this.state.success}</div>
              <div className="errors">{this.state.errors}</div>
              <div className="warnings">{this.state.warnings}</div>
            </div>
          </Loader>
        </div>
      </div>
    );
  }
});
