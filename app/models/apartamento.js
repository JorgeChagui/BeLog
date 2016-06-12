var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Apartamentos = new Schema({
  numero: String,
  piso:   String,
  torre:  String
});

module.exports = mongoose.model("apartamentos", Apartamentos);
