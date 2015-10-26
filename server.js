var express = require('express');
var app = express();
var db = require('./app/server/dbConfig.js');
var User = db.User;
var Dog = db.Dog;
var Shelter = db.Shelter;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/app/public'));
app.use(express.static(__dirname + '/node_modules'));

var sendMeData = function(query) {
  return {
    name: "Spot",
    type: 'friend',
    avail: true,
    blurb: "I love eating socks!!"
  };
}

app.post('/processSelection', function(req, res) {
  res.send(sendMeData());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
