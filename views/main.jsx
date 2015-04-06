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

        <a href="https://github.com/restful-open-annotation/ACID-RESTful-OA"><img style={{position: "absolute", top: 0, right: 0, border: 0, zIndex: 99999}} src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"/></a>

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
