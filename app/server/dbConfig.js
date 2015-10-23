// config for the db
var bookshelf = require('bookshelf');
var path = require('path');

var db = Bookshelf.initialize({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'mksdundermifflin',
    password: 'greenfield25',
    database: 'fetch_db',
    charset: 'utf8'
  }
});

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function(user) {
      user.increments('id').primary();
      user.string('password');
      user.
      // how do we add a foriegn key in this here table def?
    })
  }
});

db.knex.schema.hasTable('dogs').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('dogs', function(user) {
      user.increments('id').primary();
      user.integer('userId')
        .unsigned()
        .references('id')
        .inTable('')
      // how do we add a foriegn key in this here table def?
    })
  }
})






















//BOOKSHELF MODEL COLLECTION ABSTRACTIONS BELOW:

var Shelter, Dog, User;

User = bookshelf.Model.extend({
  tableName: 'users',
  dog: function() {
    return this.hasOne(Dog);
  }
});

Dog = bookshelf.Model.extend({
  tableName: 'dogs',
  shelter: function() {
    return this.belongsTo(Shelter);
  },
  user: function() {
    return this.belongsTo(User);
  }
});

Shelter = bookshelf.Model.extend({
  tableName: 'shelters',
  dog: function() {
    return this.hasMany(Dog);
  }
});
