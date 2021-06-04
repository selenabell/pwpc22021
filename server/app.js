/* eslint-disable no-console */
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from '@s-routes/index';
import usersRouter from '@s-routes/users';

// Importing configurations
import configTemplateEngine from '@s-config/template-engine'; 

// Webpack modules
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.dev.config';

// consultar el modo en que se esta ejecutando la aplicacion

const env = process.env.NODE_ENV || 'development';

// Se crea aplicación express
const app = express();

// Verifica el modo de ejecución

if (env === 'development') {
  console.log('>Excecuting in Development Mode: Webpack hot Reloading');
  // 1.Agregando la ruta HMR
  // reload=true: Habilita la recarga del frontend cuando hay cambios en el codigo fuente del front-end
  // timeout=1000: tiempo de espera entre recarga y recarga de la pagina
  webpackConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=1000',
    webpackConfig.entry,
  ];
  // Paso 2. Agregar el plugin
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // paso 3. Crear el compliador de webpack
  const compiler = webpack(webpackConfig);

  // paso 4. Agregando el Middleware a la cadena de Middelewares de nuesta aplicación
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      // Paso 5. Agregando el webpack hot Middleware
    })
  );
  app.use(webpackHotMiddleware(compiler));
} else {
  console.log('>Excecuting in Production Mode');
}
// view engine setup
configTemplateEngine(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
