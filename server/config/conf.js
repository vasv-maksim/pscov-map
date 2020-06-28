if (process.env.NODE_ENV === 'prod') {
  module.exports = require('./conf.prod');
} else {
  module.exports = require('./conf.dev');
}