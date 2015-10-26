var express = require('express');
var app = express();
var db = require('./app/server/dbConfig.js');
var User = db.User;
var Dog = db.Dog;
var Shelter = db.Shelter;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/app/public'));
app.use(express.static(__dirname + '/node_modules'));

// var sendMeData = function(query) {
//   return {
//     name: "Spot",
//     type: 'friend',
//     avail: true,
//     blurb: "I love eating socks!!"
//   };
// }
app.post('/addDog',function(req,res){
  new Dog({
    name: req.query.name,
    activity: req.query.activity,
    blurb: req.query.blurb,
    avail: true,
    breed: req.body.breed,
    photoUrl: req.body.photoUrl
  }).save().then(function(dog){
    console.log('Successfully Saved' + dog.name)
  })
})

app.post('/processSelection', function(req, res) {
  var activity = req.query.activity
  new Dog({
    activity: activity,
  }).fetch().then(function(found) {
    if (found) {
      res.send(found.attributes);
    } else {
      console.log('not found bro')
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});