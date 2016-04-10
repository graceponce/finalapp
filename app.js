var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var routes = require('./routes/index');
var users = require('./routes/users');

function getApp(db) {

  var app = express();

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'hbs');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(cookieParser());
  app.use(require('less-middleware')(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret:'vbhvgjcgccyuhvuulvuyjhv',
  resave:true,
  saveUninitialized:true,
  cookie:{
    maxAge:1000*60*24*7
  }
}));


  var api = require('./routes/api')(db);
  var usersr = require('./routes/usersr')(db);
  app.use('/', routes);
  app.use('/users',users);
  app.use('/usersr', usersr);
  app.use('/api', api);

  /*Paginas a utilizar*/
  /*-------------------------*/
  /*app.get('/dashboard', function(req, res, next) {
    res.render('dashboard', {});
  });*/

  app.get('/registrarus', function(req, res, next) {
    res.render('registrarus', {});
  });

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });

  return app;
}

module.exports = getApp;
