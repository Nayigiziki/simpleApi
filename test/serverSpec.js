var expect = require('chai').expect;
var url = 'http://127.0.0.1:8080/api/v1';
var async = require('async');
var request = require('superagent');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var config = require('../config');
var userModel = require('../authentication/db').userModel;
var db = mongoose.connection;
mongoose.connect(config.database);

describe('Authentication', function() {
  after(function(done){
    userModel.remove({occupation: 'dummy'}, function(err){
      if(err){ 
        console.log('err', err);
      }
      done();
    })
  })

  describe('register ', function () {
    var user = { 
      username: 'taaaaa', 
      password: 'tobi',
      occupation : 'dummy',
      city : 'laavxaaa' 
    };

    it('should create a new user', function (done) {
      request
      .post(url + '/register')
      .send(user)
      .end(function(err, res){
        expect(res.status).to.equal(201);
        done();
      });

    });

    it('should not create a non-unique user', function (done) {
      request
      .post(url + '/register')
      .send(user)
      .end(function(err, res){
        request
        .post(url + '/register')
        .send(user)
        .end(function(err, response){
          expect(response.status).to.equal(400);
          done();
        });
      });
    });
  });

  describe('login', function () {
    it('should not login a user that does not exists', function (done) {
     user = {
        username: 'daa',
        password: 'dne',
        occupation : 'dummy',
        city : 'laaxs' 
      }

      request
      .get(url + '/authorize')
      .send(user)
      .end(function(err, res){
        expect(res.status).to.equal(400);
        done();
      });
    });


    it('should login a user that exists', function (done) {
      request
      .post(url + '/register')
      .send(user)
      .end(function(err, res){
        request
        .get(url + '/authorize')
        .send(user)
        .end(function(err, response){
          expect(response.status).to.equal(201);
          done();
        });
      });
    });
  });
});




  describe('/users ', function() {
    before(function(done){
      function addUsersToDB(occupation, done){
        for(var j = 0; j <= 20; j++){
          (function(i){
            var name = 'joe' + i;
            var newUser = new userModel({username: name, password: i, occupation: occupation, city : 'la' + i});
            newUser.save(function (err, newDood) {
              if (err) return console.error(err);
              if(i === 10){
                if(done){
                  done();
                }
              }
            });
          })(j)
        }
      }
      addUsersToDB('dummy1');
      addUsersToDB('dummy2', done);
    });

    it('returns all users filtered the correct filterBy value', function (done) {
        var obj = {
          filterBy : 'occupation',
          filterValue : 'dummy',
          sortBy : 'city'
        }
        request
        .get(url + '/users')
        .query(obj)
        .end(function(err, response){
          var isSameFilterParam = response.body.data.reduce(function(prev, curr){
            if(curr.occupation === obj.filterValue){
              return true;
            } else {
              return false;
            }
          }, true)
          expect(response.status).to.equal(200);
          expect(isSameFilterParam).to.equal(true);
          done();
        });
    });
  });



