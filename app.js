const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const connectBusboy = require('connect-busboy');

// Load routes
const index = require('./routes');
const api = require('./routes/api');
const login = require('./routes/login');
const films = require('./routes/films');
const busboy = require('./routes/busboy');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['film-api'],
  maxAge: 60 * 60 * 1000 // 1 hour
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(connectBusboy({ immediate: true }));

app.use('/', index);
app.use('/', login);
app.use('/films', films);
app.use('/busboy', busboy);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
