var authentication = require('./authentication/controller');
var users = require('./users/controller');
var files = require('./files/controller');
var health = require('./health/controller');

var setup = function(app) {
  //default response
  console.log('setting up routes');
  app.post('/api/v1/register', authentication.signup);
  app.get('/api/v1/authorize', authentication.login);
  app.get('/api/v1/users', users.findUsers);
  app.get('/api/v1/healthStatus', health.checkComponentHealth);
  app.get('/api/v1/fileslisting', files.getListOfDir);
  app.get('*', function(req, res) {
    res.status(400).json({status: 'Resource does not exist'});
  });
};

module.exports.setup = setup;

