var express = require('express');
var app = express();

// To switch databases, uncomment the postgres and comment out the dbConfig
// var db = require('./app/server/dbConfig.js');
var db = require('./app/server/dbHerokuPostgres.js');

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
  var dog = JSON.parse(req.query.dog);
  new Dog({
    name: dog.name,
    activity: dog.activity,
    blurb: dog.blurb,
    isAvail: true,
    breed: dog.breed,
    photoUrl: dog.photoUrl
  }).save().then(function(dog){
    res.end();
    console.log('Successfully Saved')
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
  var email = req.query.email;
  var firstName = req.query.firstName;
  var lastName = req.query.lastName;
  var password = req.query.password;

  bcrypt.hash(password, 5, function(error, hash) {
    var pass = hash;

    new User({ email: email })
      .fetch()
      .then(function(user) {
        if (!user) {
          var newUser = new User({
            email: email,
            firstName: firstName,
            lastName: lastName,
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
  var firstName = req.query.firstName;
  var lastName = req.query.lastName;
  var email = req.query.email;
  var password = req.query.password;

  var newUser = new User({ email: email })
    .fetch()
    .then(function(user) {
      if (!user) {
        console.log('Email does not exist');
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

