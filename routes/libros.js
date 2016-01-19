var express = require('express');
var router = express.Router();
var path = require('path')

/*** Mongoose ***/
var mongoose = require('mongoose');
/*mongoose.connect('mongodb://localhost:27017/fil');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Conectado!!!!')
});*/


/*** Libro ***/
var libroSchema = mongoose.Schema({
	titulo: String,
	autores: [
		{
			nombre: String,
			apellidos: String
		}
	],
	semblanza: String,
	portada: String
});

var Libro = mongoose.model('Libro', libroSchema);



/*** Rutas ***/

// Index (Libros)
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, "../views/libros/indexLibros.html"))
});

// Formulario de alta
router.get('/alta', function(req, res, next) {
  res.sendFile(path.join(__dirname, "../views/libros/formularioAltaLibro.html"));
});

// Método que agrega el libro y termina con una vista nueva
router.post('/nuevo', function(req, res, next) {

	
	var nuevo = new Libro({
		titulo: req.body.titulo,
		autores: [{
			nombre: req.body.nombre,
			apellidos: req.body.apellidos
		}],
		semblanza: req.body.semblanza,
		portada: req.body.portada

	});

	console.log(nuevo);

	nuevo.save();

  res.sendFile(path.join(__dirname, "../views/libros/indexLibros.html"))
});

// Web service Libros
router.get('/mostrar/todos', function(req, res, next) {

	var libros = Libro.find({ }, function (err, docs) {
  		// docs is an array
  		console.log('Adentro');
  		//console.log(docs);
  		res.json(docs);
	});
});

// Update Modifica los campos y envía cuantos fueron modificados
router.get('/modificar/:id', function(req, res, next) {
	var libro = { _id: '569e6277dcbc84ca719e127f' };
	var modificacion = {titulo: 'una actualización del titulo otra vez y otra vez'};
	var options = {multi: true};
	//var callback = function(){console.log('fin')};
	var libros = Libro.update(libro, modificacion, options, function (err, docs) {
  		// docs is an array
  		console.log('guardado');
  		//console.log(docs);
	});

	var show = Libro.find(libro, function (err, docs) {
  		// docs is an array
  		console.log('Adentro');
  		//console.log(docs);
  		res.json(docs);

	});
});

//Eliminar un libro
router.get('/eliminar/:id', function(req, res, next) {
	var libro = { _id: req.params.id };
	Libro.remove(libro, function (err, docs) {
  		// docs is an array
	});
	res.sendFile(path.join(__dirname, "../views/libros/indexLibros.html"))
});



module.exports = router;
