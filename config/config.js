var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'belog'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/belog'
  },

  test: {
    root: rootPath,
    app: {
      name: 'belog'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/belog-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'belog'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/belog-production'
  }
};

module.exports = config[env];
