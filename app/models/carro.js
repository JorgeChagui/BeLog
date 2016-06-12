var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Carros = new Schema({
  placa:    String,
  modelo:   String,
  imagen:   String
});

module.exports = mongoose.model("carros", Carros);
