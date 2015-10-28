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
app.use(session({
  secret: "This is a secret"
}));


app.post('/addDog', function(req, res) {
  var dog = JSON.parse(req.query.dog);
  new Dog({
    name: dog.name,
    activity: dog.activity,
    blurb: dog.blurb,
    isAvail: true,
    isMale: dog.isMale,
    breed: dog.breed,
    photoUrl: dog.photoUrl
  }).save().then(function(dog) {
    res.end();
    console.log('Successfully Saved')
  })
})

app.post('/processSelection', function(req, res) {
  console.log('in process Selection')
  var activity = req.query.activity;
  Dog.query({
    where: {
      activity: activity,
      isAvail: true
    }
  }).fetchAll().then(function(found) {
    if (found.models.length !== 0) {
      var foundArray = found.models
      console.log('foundArray', foundArray)
      var lowestOuting = null;
      var lowestCount = 100;
      for (var i = 0; i < found.models.length; i++) {
        console.log('foundmodeli', found.models[i])
        if (found.models[i].attributes.outings < lowestCount) {
          lowestCount = found.models[i].attributes.outings;
          lowestOuting = found.models[i];
        }
      }
      new Dog({
        id: lowestOuting.attributes.id
      }).save({
        isAvail: false,
        outings: lowestOuting.attributes.outings + 1
      });
      console.log('lowestOuting', lowestOuting.attributes)
      return res.send(lowestOuting.attributes);
    } else {
      console.log('No dogs are available, please try again later')
    }
  })
})

app.post('/confirmReturn', function(req, res) {
  console.log('in confirm Return')
  console.log(req.query)
  var id= req.query.id
  new Dog({
    id: id
  }).save({
    isAvail: true
  })
})

//   new Dog({
//     activity: activity,
//   }).fetch({withRelated:['activity']}).then(function(found) {
//     if (found) {
//       console.log('FOUND: ', found)
//       res.send(found.attributes);
//     } else {
//       console.log('not found bro')
//     }
//   });
// });


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

    new User({
        email: email
      })
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

  var newUser = new User({
      email: email
    })
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

app.post('/shelterRegister', function(req, res) {
  var email = req.query.email;
  var displayName = req.query.displayName;
  var password = req.query.password;

  bcrypt.hash(password, 5, function(error, hash) {
    var pass = hash;

    new Shelter({
        email: email
      })
      .fetch()
      .then(function(user) {
        if (!user) {
          var newShelter = new Shelter({
            email: email,
            displayName: displayName,
            password: pass
          })

          newShelter.save()
            .then(function(newShelter) {
              req.session.userid = newShelter;
              res.send('shelterForm');
            });
        } else {
          console.log('Shelter already exists');
          res.send('shelterLogin');
        }
      })
  })
});


app.post('/shelterLogin', function(req, res) {
  var displayName = req.query.displayName
  var email = req.query.email;
  var password = req.query.password;

  var newShelter = new Shelter({
      email: email
    })
    .fetch()
    .then(function(shelter) {
      if (!shelter) {
        console.log('Email does not exist');
        res.send('login');
      } else {

        var dbHash = shelter.attributes.password;

        bcrypt.compare(password, dbHash, function(error, matches) {
          if (matches) {
            console.log('Approved');
            req.session.userid = shelter;
            res.send('shelterDogs');
          } else {
            console.log('NO');
            res.send('login');
          }
        })
      }
    })
});

app.post('/loadDogs', function(req, res) {
  Dog.fetchAll()
    .then(function(dogs) {
      var dogModels = dogs.models
      var result = [];
      for (var i = 0; i < dogs.models.length; i++) {
        result.push(dogs.models[i].attributes)
      }
      console.log('RESULT', result)
      res.send(result)
    })
})

app.get('/logout', function(req, res) {
  delete req.session.userid;
  res.send('login');
});