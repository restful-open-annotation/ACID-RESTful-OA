"use strict";

var React = require('react');

//-------------------------------------------------------------------------

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      origin: location.origin
    };
  },

  getInitialState: function () {
    return {
      seeAPI: false
    };
  },

  render: function () {
    var self = this;
    return (
      <span>
        {(this.state.seeAPI) ?
         <code style={{fontSize: "80%"}}>{this.props.API(self.props.origin)}</code> :
         <a style={{float:'inherit'}} className="label label-default" title="Click to see the REST API" onClick={function () { self.setState({seeAPI: true}); }}>API</a>
         }
      </span>
    );
  }
});
