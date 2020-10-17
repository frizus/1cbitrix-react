window.jQuery = require("jquery/dist/jquery.js");
window.$ = window.jQuery;
//require('../bootstrap/js/bootstrap.min.js');
require("./bootstrap/js/dropdown");
require("Ripple.js/dist/ripple.min.js");
require('./ripple.js');

import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./component/App.js";

ReactDOM.render(<App />, document.querySelector("#root"));