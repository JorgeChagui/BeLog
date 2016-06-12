// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Tarjetas = new Schema({
    n0: String, //HEX number
    n1: String, //HEX number
    n2: String, //HEX number
    n3: String, //HEX number
    n4: String, //HEX number
    n5: String,  //HEX number
  usuario:    {type: Schema.ObjectId, ref: "usuarios"},
  carro:      {type: Schema.ObjectId, ref: "carros"},
  apartamento:{type: Schema.ObjectId, ref: "apartamentos"}
});


mongoose.model('tarjetas', Tarjetas);
