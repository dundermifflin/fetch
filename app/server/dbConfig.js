var path = require('path');
var knex = require('knex')({
  client: 'sqlite',
  connection: {
    host: '127.0.0.1',
    user: 'mksdundermifflin',
    password: 'greenfield25',
    database: 'fetch_db',
    charset: 'utf8',
    filename: path.join(__dirname, '../db/fetch.sqlite')
  }
});

knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('users', function(user) {
      user.increments('id').primary();
      user.string('username').primary();
      user.string('password');
      user.integer('zip');
      user.binary('hasDog');
    }).then(function(table) {
      console.log('made the user table', table);
    })
  }
});

knex.schema.hasTable('dogs').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('dogs', function(dog) {
      dog.increments('id').primary();
      dog.integer('userId')
        .unsigned()
        .references('id')
        .inTable('users');
      dog.integer('shelterId')
        .unsigned()
        .references('id')
        .inTable('shelters');
      dog.string('name');
      dog.binary('isMale');
      dog.string('blurb');
      dog.string('activity');
      dog.string('photoUrl');
      dog.string('breed');
      dog.integer('fetchCount');
      dog.binary('isAvailable');
    }).then(function(table) {
      console.log('dog table has been made');
    })
  }
});

knex.schema.hasTable('shelters').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('shelters', function(shelter) {
      shelter.increments('id').primary();
      shelter.string('username').primary();
      shelter.string('password');
      shelter.integer('zip');
      shelter.integer('name');
    }).then(function(table) {
      console.log('shelter table has been made');
    })
  }
});




//BOOKSHELF MODEL COLLECTION ABSTRACTIONS BELOW:

var bookshelf = require('bookshelf')(knex)

var User = bookshelf.Model.extend({
  tableName: 'users',
  dog: function() {
    return this.hasOne(Dog);
  }
});

var Dog = bookshelf.Model.extend({
  tableName: 'dogs',
  shelter: function() {
    return this.belongsTo(Shelter);
  },
  user: function() {
    return this.belongsTo(User);
  }
});

var Shelter = bookshelf.Model.extend({
  tableName: 'shelters',
  dog: function() {
    return this.hasMany(Dog);
  }
});



module.exports.User = User;
module.exports.Dog = Dog;
module.exports.Shelter = Shelter;