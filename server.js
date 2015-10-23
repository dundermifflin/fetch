var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/app/public'));
app.use(express.static(__dirname + '/node_modules'));

// views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');


 // app.get('*', function(req, res) {
 //            res.sendFile(__dirname + '/app/public/index.html'); // load our public/index.html file
 //        });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



/*
  if we want to use views with a templating engine,
  the commented out lines of code will start that.

  - TODO: add firebase
*/


