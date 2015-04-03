"use strict";

var _ = require('lodash');
var React = require('react');
var lib = require('../src/lib.js');
var $ = require('jquery');

//-------------------------------------------------------------------------

var JSON_SCHEMA_URI;
$.get("jsonSchema")
 .done(function (x) {
   lib.addJsonSchema(x.uri, x.schema);
   JSON_SCHEMA_URI = x.uri;
 });

function errorItem(e) {
  return <li>{e.toString()}</li>;
}

module.exports = React.createClass({
  getInitialState: function () {
    return {
      toBeChecked: '{"key":"value"}',
      success: "",
      errors: "",
      warnings: ""
    };
  },

  setToBeChecked: function () {
    this.setState({toBeChecked: this.refs.textarea.getDOMNode().value});
  },

  check: function () {
    var self = this;
    this.setState({result:"loading..."});

    var submitted = self.state.toBeChecked;
    var jsonld;
    try {
      jsonld = JSON.parse(submitted);
    } catch (e) {
      //TODO request GET
      jsonld = "WRONG";
    }
    var ret = lib.validateJsonSyntax(jsonld, JSON_SCHEMA_URI);

    self.setState({
      success: (ret.valid) ? "OK!" : "",
      errors: <ul>{_(ret.errors, errorItem)}</ul>,
      warnings: <ul>{_(ret.missing, errorItem)}</ul>
    });
  },

  render: function () {
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <div><button className="btn btn-success" onClick={this.check} disabled={this.state.toBeChecked === ""}>Check</button><span>OA / JSON-LD syntax</span></div>
          <textarea ref="textarea" placeholder="Paste here your json-ld or a GET endpoint" onChange={this.setToBeChecked} value={this.state.toBeChecked}/>
          <div className="result">
            <div className="success">{this.state.success}</div>
            <div className="errors">{this.state.errors}</div>
            <div className="warnings">{this.state.warnings}</div>
          </div>
        </div>
      </div>
    );
  }
});
