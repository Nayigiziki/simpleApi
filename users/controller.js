var UserModel = require('../authentication/db').userModel;

function findUsers(req, res, next){
  var user = req.query;
  var occupation = user.occupation;
  var filterBy = {};
  var sortBy = {};

  filterBy[req.query.filterBy] = req.query.filterValue;
  sortBy[req.query.sortBy] = -1;

  UserModel
    .find(filterBy)
    .select('username occupation city')
    .sort(sortBy)
    .exec(function(err, models){
      if(err){
        res.status(400).json({status: 'unsuccessfully fetched users', data: null})
        console.log('err', err);
      } else {
        res.status(200).json({status:'successfully fetched users', data: models})
      }
    });
  }

module.exports = {
  findUsers : findUsers
}
