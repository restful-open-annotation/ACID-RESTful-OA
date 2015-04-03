"use strict";

var React = require('react');

var SyntaxChecker = require("./SyntaxChecker.jsx");

module.exports = React.createClass({
  getDefaultProps: function () {
    return {
      initHash: "#syntaxChecker"
    };
  },

  getInitialState: function () {
    return {
      hash: (window.location.hash) ? window.location.hash : this.props.initHash
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
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#" onClick={function () { self.setState({hash: self.props.initHash}); }}>ACID-RESTful-OA</a>
            </div>
            <div id="navbar" className="navbar-collapse collapse">
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="main">
            <div className="row">

              <div className="col-xs-3">
                <ul className="nav nav-pills nav-stacked">
                  {e("#syntaxChecker", function (id) {
                    return <li className={a(id)}><a href={id} onClick={c} data-toggle="pill">Validate OA / JSON-LD</a></li>;})}
                  {e("#TODO", function (id) {
                    return <li className={a(id)}><a href={id} onClick={c} data-toggle="pill">TODO</a></li>;})}
                </ul>
              </div>

              <div className="tab-content col-xs-9">
                {e("#syntaxChecker", function (id) {
                  return <div id="syntaxChecker" className={"tab-pane "+a(id)}><SyntaxChecker/></div>;})}
                {e("#TODO", function (id) {
                  return <div id="TODO" className={"tab-pane"+a(id)}>TODO</div>;})}
              </div>
            </div>
          </div>
        </div>
        <footer>
        </footer>
      </div>
    );
  }
});
