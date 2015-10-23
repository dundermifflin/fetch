var express = require('express');
var app = express();
var db = require('./app/server/dbConfig.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/app/public'));
app.use(express.static(__dirname + '/node_modules'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

