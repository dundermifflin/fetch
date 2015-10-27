var express = require('express');
var app = express();
var db = require('./app/server/dbConfig.js');
var db = require('./app/server/dbHerokuPostgres.js');  // use this one for postgres database
var User = db.User;
var Dog = db.Dog;
var Shelter = db.Shelter;
var bcrypt = require('bcrypt');
var session = require('express-session');

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

app.post('/signup', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  bcrypt.hash(password, null, null, function(error, hash) {
    new User({ username: username })
      .fetch()
      .then(function(user) {
        if (!user) {
          var newUser = new User({
            username: username,
            password: hash
          })

          newUser.save()
            .then(function(newUser) {
              req.session.userid = newUser;
              res.redirect('/selection');
            });
        } else {
          console.log('Account already exists');
          res.redirect('/signup');
        }
      })
  })
});

  app.post('/login', function(req, res) {
    var name = req.body.username;
    var password = req.body.password;


    new User({ username: name })
      .fetch()
      .then(function(user) {
        if (!user) {
          console.log('username does not exist')
          res.redirect('/login');
        }

    bcrypt.compare(password, user.get('password'), function(error, matches) {
        if (matches) {
          console.log('Approved');
          req.session.userid = user;
          res.redirect('/selection');
        } else {
          console.log('NO');
          res.redirect('/login');
        }
      })
    })
  });

  app.get('/logout', function(req, res) {
    delete req.session.userid;
    res.redirect('/login');
  });

