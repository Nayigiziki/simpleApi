var fs = require('fs');

function getListOfDir(req, res, next){
  fs.readdir( __dirname + '/../', function( err, files ){
    if(err){
      console.log('err', err);
      res.status(400).json({data: null});

    } else {
      res.status(200).json({data: files});
    }
  });
}

module.exports = {
  getListOfDir : getListOfDir
}

