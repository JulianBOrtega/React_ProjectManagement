require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const connectDB = require('./database/config');

const app = express();
const checkToken = require('./middleware/checkToken');
const cors = require('cors');
const whiteList = [process.env.URL_FRONT, process.env.URL_FRONT_TWO];
const corsOps = {
  origin: function(origin, callback)
  {
    if(whiteList.includes(origin))
    {
      callback(null, true);
    }
    else
    {
      callback(new Error('Error de Cors'));
    }
  }
}

connectDB();

app.use(cors(corsOps))

app
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))

/*! Rutas */

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

/* Api */
app.use('/auth', require('./routes/auth'));
app.use('/users', checkToken, require('./routes/users'));
app.use('/projects', checkToken, require('./routes/projects'));
app.use('/tasks', checkToken, require('./routes/tasks'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    ok : false,
    msg : err.message ? err.message : 'Upss, hubo un error!'
  })
});


module.exports = app;
