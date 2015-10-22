var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

/*
  if we want to use views with a templating engine,
  the commented out lines of code will start that.

*/

// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

app.get('/', function(request, response) {
 // response.render('pages/index');
 response.send('Go Fetch!')
});

var server = app.listen(app.get('port'), function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Node app is running on port', app.get('port'));
});
