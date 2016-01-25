var mongoose = require('mongoose');

function checkComponentHealth( req, res, next ){
  mongoose.connection.db.command({ serverStatus: 1 }, function( err, result ){
      res.status(200).json({ data : { ok : result.ok } });
  })
}

module.exports = {
  checkComponentHealth : checkComponentHealth
}