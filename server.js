//image server, serves static files
var parser = require('body-parser')
var cookieParser = require('cookie-parser');
var compression = require('compression');
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var app = express();
var config = require('./config');
var routes = require('./routes.js');

mongoose.connect(config.database);
app.use(compression());
app.use(morgan('tiny'));
app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

(function initServer() {
  // attaches all the routes to the server
  routes.setup(app);
  var port = process.env.PORT || 8080;
  var server = app.listen(port);
  console.log("Express server listening on %d in %s mode", port, app.settings.env)
})()

exports.app = app;


