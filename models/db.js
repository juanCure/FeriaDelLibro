var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://132.248.129.6:27017/fil', function(err){
  if(err){
    console.log('connection error', err);
  } else {
    console.log('connection sucessful');
  }
});
