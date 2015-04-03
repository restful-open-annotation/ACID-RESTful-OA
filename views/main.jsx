"use strict";

var React = require('react');

var SyntaxChecker = require("./SyntaxChecker.jsx");

module.exports = React.createClass({
  getInitialState: function () {
    return {
      hash: (window.location.hash) ? window.location.hash : "#syntaxChecker"
    };
  },

  render: function () {
    var self = this;

    var e = function (id, f) {
      return f(id);
    };
    var a = function (id) {
      return (self.state.hash === id) ? "active" : "";
    };
    var c = function (e) {
      var id = e.target.getAttribute("href");
      window.location.hash = id;
      if (self.state.hash !== id) {
        self.setState({hash:id});
      }
    };

    return (
      <div className="main">
        <div className="row">

          <div className="col-md-3">
            <ul className="nav nav-pills nav-stacked">
              {e("#syntaxChecker", function (id) {
                return <li className={a(id)}><a href={id} onClick={c} data-toggle="pill">Validate OA / JSON-LD syntax</a></li>;})}
              {e("#TODO", function (id) {
                return <li className={a(id)}><a href={id} onClick={c} data-toggle="pill">TODO</a></li>;})}
            </ul>
          </div>

          <div className="tab-content col-md-9">
            {e("#syntaxChecker", function (id) {
              return <div id="syntaxChecker" className={"tab-pane "+a(id)}><SyntaxChecker/></div>;})}
            {e("#TODO", function (id) {
              return <div id="TODO" className={"tab-pane"+a(id)}>TODO</div>;})}
          </div>
      </div>
      </div>
    );
  }
});
