"use strict";

//var _ = require('lodash');
var React = require('react');
var SeeAPI = require('./SeeAPI.jsx');
var Loader = require('react-loader');

//-------------------------------------------------------------------------

module.exports = React.createClass({

  getInitialState: function () {
    return {
    };
  },

  render: function () {
    //var self = this;
    return (
      <div>
        <div>
          <button className="btn btn-success" onClick={this.check} disabled={this.state.toBeChecked === ""}>Test</button>
          <SeeAPI API={function (origin) { return 'curl -H "Content-Type: application/ld+json" -X POST -d \'{"url":"<the_server_endpoint>",data:"<jsonld>"}\' '+origin+'/testPOST'; }} />
        </div>
        <input type="text" ref="url" placeholder="Paste here a POST endpoint" onChange={this.setToBeChecked} value={this.state.toBeChecked} />
        <textarea ref="data" placeholder="Paste here your json-ld" onChange={this.setToBeChecked} value={this.state.toBeChecked} />
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
