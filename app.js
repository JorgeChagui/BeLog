
/**
 * Declaracion de "librerias" que se usaran
 */
var express = require('express'),
  app = express(),
  config = require('./config/config'),
  server = require('http').Server(app),
  glob = require('glob'),
  mongoose = require('mongoose'),
  io = require('socket.io')(server);

/**
 * Sincronizamos los modelos de nuestra aplicacion para cargarlos automáticamente
 * @param   config.root +             '/app/models/*.js' Ruta donde se encuentran los modelos de nuestra app
 */
var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

/**
 * Coneccion a la base de datos de Mongodb
 * @param  config.db Objeto que se encuentra en la carpeta de configuracion el cual tiene la ruta de la base de datos.
 */
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('No se puede conectar a la base de datos : ' + config.db);
});

require('./config/express')(app, config);

app.use(express.static("public"));

server.listen(config.port, function () {
  console.log('Servidor Express escuchando en puerto : ' + config.port);
});

io.on("connection",function(socket){
  console.log("Alguien se ha conectado con Sockets");
  socket.on("connection",function(data){
    console.log(data);
  });
  socket.on("newcard",function(data){
    console.log(data);
    io.sockets.emit("newread",data);
  });
});
