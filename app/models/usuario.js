var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Usuarios = new Schema({
  nombres:    String,
  apellidos:  String,
  cedula:     String
});

module.exports = mongoose.model("usuarios", Usuarios);
