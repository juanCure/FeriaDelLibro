var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

/* GET /autores listando. */
router.get('/', function(req, res, next) {
  mongoose.model('Autor').find(function (err, autores) {
    if (err) return next(err);
    res.json(autores);
  });
});
/* GET /autores/nuevo mostrando el formulario para crear un autor nuevo*/

router.get('/nuevo', function(req, res){
  res.sendFile(path.join(__dirname, "../views/autores/formulario.html"))
});

/* GET /autores/list
Metodo para listar todos los usuarios
*/

router.get('/list', function(req, res) {
  res.sendFile(path.join(__dirname, "../views/autores/list.html"));
});

/* GET /autores/mostrar/:id*/

router.get('/mostrar/:id', function(req, res){
  res.sendFile(path.join(__dirname, "../views/autores/mostrar.html"));
});

/* POST /procesa_autores */
router.post('/crear', function(req, res, next) {
  // Autor.create(req.body, function (err, post) {
  //   if (err) return next(err);
  //   res.json(post);
  // });
  var nombre = req.body.nombre;
  var apellidos = req.body.apellidos;
  var libros = req.body.libros;
  var semblanza = req.body.semblanza;
  var foto = req.body.foto;
  var fecha = req.body.fecha;
  var autor = mongoose.model('Autor').create({
    nombre: nombre,
    apellidos: apellidos,
    libros: [{titulo: libros}],
    semblanza: semblanza,
    foto: foto,
    fecha: fecha
  }, function (err, autor){
    if(err) return next(err);
    else {
      console.log(autor);
      //res.json(autor);
      res.sendFile(path.join(__dirname, "../views/autores/list.html"));
    }
  });
});

/* GET /autores/id */
router.get('/:id', function(req, res, next) {
  mongoose.model('Autor').findById(req.params.id, function (err, autor) {
    if (err) return next(err);
    res.json(autor);
  });
});

//Eliminar un autor
// GET /autores/eliminar/:id
router.get('/eliminar/:id', function(req, res, next) {
	var autor = { _id: req.params.id };
	mongoose.model('Autor').remove(autor, function (err, docs) {
  		// docs is an array
	});
	res.sendFile(path.join(__dirname, "../views/autores/list.html"));
});

module.exports = router;
