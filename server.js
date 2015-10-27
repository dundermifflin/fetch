var express = require('express');
var app = express();
var db = require('./app/server/dbConfig.js');
var User = db.User;
var Dog = db.Dog;
var Shelter = db.Shelter;
var bcrypt = require('bcrypt');
var session = require('express-session');
var cookieParser = require('cookie-parser');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/app/public'));
app.use(express.static(__dirname + '/node_modules'));

app.use(cookieParser());
app.use(session({secret: "This is a secret"}));


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
  var activity = req.query.activity;
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


app.post('/register', function(req, res) {
  var name = req.query.username;
  var password = req.query.password;
  
  bcrypt.hash(password, 5, function(error, hash) {
    var pass = hash;
    
    new User({ name: name })
      .fetch()
      .then(function(user) {
        if (!user) {
          var newUser = new User({
            name: name,
            password: pass
          })

          newUser.save()
            .then(function(newUser) {
              req.session.userid = newUser;
              res.send('selection');
            });
        } else {
          console.log('Account already exists');
          res.send('login');
        }
      })
  })
});


app.post('/login', function(req, res) {
  var name = req.query.name;
  var password = req.query.password;

  var newUser = new User({ name: name })
    .fetch()
    .then(function(user) {
      if (!user) {
        console.log('Username does not exist');
        res.send('login');
      } else {

  var dbHash = user.attributes.password;

  bcrypt.compare(password, dbHash, function(error, matches) {
      if (matches) {
        console.log('Approved');
        req.session.userid = user;
        res.send('selection');
      } else {
        console.log('NO');
        res.send('login');
      }
    })
    }
  })
});


app.get('/logout', function(req, res) {
  delete req.session.userid;
  res.send('login');
});

