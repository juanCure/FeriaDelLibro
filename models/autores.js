var mongoose = require('mongoose');

var autorSchema = new mongoose.Schema({
  nombre: String,
  apellidos: String,
  libros: [{titulo: String}],
  semblanza: String,
  foto: String,
  fecha: String
});

module.exports = mongoose.model('Autor', autorSchema);
