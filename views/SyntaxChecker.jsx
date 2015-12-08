"use strict";

var _ = require('lodash');
var React = require('react'),
    SeeAPI = require('./SeeAPI.jsx'),
    Input = require('./Input.jsx'),
    Loader = require('react-loader');

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
      input: {},
      actionable: false,
      loaded: true,
      success: "",
      errors: "",
      warnings: ""
    };
  },

  inputChanged: function (input) {
    this.setState({
      input: input,
      actionable: (input.body) ? true : false,
      //Reset results
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
    var submitted = this.state.input.body;
    try {
      this.checkAndReact(JSON.parse(submitted));
    } catch (e) {
      $.get("get", { url: submitted })
       .done(function (jsonld) {
         self.setState({ input: { body: JSON.stringify(jsonld, null, 2) }});
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
      <div>
        <div>
          <button className="btn btn-success" onClick={this.check} disabled={!this.state.actionable}>Validate</button>
          <SeeAPI API={function (origin) { return 'curl -H "Content-Type: application/ld+json" -X POST -d \'{"your":"json"}\' '+origin+'/validate'; }} />
        </div>
        <Input changed={this.inputChanged}>
          <textarea name="body" placeholder="Paste here your json-ld or a GET endpoint" value={this.state.input.body} onChange={function () {}} />
        </Input>
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
