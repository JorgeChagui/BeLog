
/**
 * Declaracion de "librerias" que se usaran
 */
var server = require('http').createServer(),
  url = require('url'),
  WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({ server: server }),
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  glob = require('glob'),
  config = require('./config/config'),
  port = config.port;
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

server.on('request', app);
server.listen(port, function () {
  console.log('Servidor Express escuchando en puerto : ' + server.address().port);
}); 

wss.on('connection', function connection(ws) {
  var location = url.parse(ws.upgradeReq.url, true);
  // you might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('Hola');
});
