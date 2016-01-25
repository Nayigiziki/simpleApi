var bcrypt = require('bcryptjs');
var UserModel = require('./db').userModel;

var comparePasswords = function (passwordProvided, passwordDb, callback) {
  bcrypt.compare(password, passwordDb, function (err, result) {
    if (err || !result) {
      callback(false);
    }else {
      callback(true);
    }
  });
}

var generateHashedPassword =  function(pass) {
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(pass, salt);
  return hash;
}

var userDne  = function(user, cb){
  UserModel.findOne({ username: user }, function (err, user) {
    if (err) {
      console.log('err ', err);
      cb(false);
    } else {
      cb(user);
    }
  })
}


function login(req, res, next) {
  var user = req.body;
  userDne(user.username, function(userExists){
    if(userExists) {
      if(bcrypt.compareSync(user.password, userExists.password)){
        res.status(201).json({status: 'user authenticated'});
      } else {
        res.status(400).json({error: 'User or Password invalid'});
      }
    } else {
      res.status(400).json({error: 'User or Password invalid'});
    }
  })
}

function signup(req, res, next) {
  var user = req.body;
  console.log('signup');
  userDne(user.username, function(userExists){
    if(userExists) {
      res.status(400).json({status: 'user already exists'});
    } else {
      console.log('generating salt');
      var salt = generateHashedPassword(user.password);
      var newUser = new UserModel({username:user.username, password: salt, occupation: user.occupation, city : user.city});
      newUser.save(function (err, newDood) {
        if (err) return console.error(err);
        res.status(201).json({status: 'user created'});
      });
    }
  });
}



module.exports = {
  login: login,
  signup: signup
};





