window.jQuery = require("jquery/dist/jquery.js");
window.$ = window.jQuery;
//require('../bootstrap/js/bootstrap.min.js');
require("Ripple.js/dist/ripple.min.js");
require('./ripple.js')

import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./component/app.js";

ReactDOM.render(<App />, document.querySelector("#root"));