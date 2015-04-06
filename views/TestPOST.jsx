"use strict";

//var _ = require('lodash');
var React = require('react');
var SeeAPI = require('./SeeAPI.jsx');
//var Loader = require('react-loader');

//-------------------------------------------------------------------------

module.exports = React.createClass({
  getInitialState: function () {
    return {
    };
  },

  render: function () {
    //var self = this;
    return (
      <div id="testPOST">
        <div>
          <p>TODO</p>
          <SeeAPI API={function (origin) { return 'curl -H "Content-Type: application/ld+json" -X POST -d \'{"url":"<the_server_endpoint>",data:"<jsonld>"}\' '+origin+'/testPOST'; }} />
        </div>
      </div>
    );
  }
});
