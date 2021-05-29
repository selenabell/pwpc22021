var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', author:'Selena Bello',appName:'WebApp', company: 'Awsome Software'});
});

/*Agregando una nueva ruta */
router.get('/greeting', function(req, res, next){
  res.send("Hola Bienvenido");
});


module.exports = router;
