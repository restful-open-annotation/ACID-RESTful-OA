"use strict";

var _ = require('lodash');
var React = require('react');

module.exports = React.createClass({

  getInitialState: function () {
    var state = {};

    var children = (Array.isArray(this.props.children)) ? this.props.children : [this.props.children];
    _.forEach(children, function (e, index) {
      var key = e.props.name || index;
      var value = e.props.value || "";
      state[key] = value;
    });

    return state;
  },

  onChange: function (e) {
    var key = e.target.getAttribute('name');
    var value = e.target.value;
    var state = this.state;
    state[key] = value;
    this.setState(state);

    if (this.props.changed) {
      this.props.changed(state);
    }
  },

  render: function () {
    return (
      <div {...this.props} className="input" onChange={this.onChange}></div>
    );
  }

});
