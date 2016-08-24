var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var server = http.createServer(app).listen(8080);

//Route variables
var hours = require('./routes/hours');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve back static files
app.use(express.static(path.join(__dirname, './public')));

// Routes
app.use('/hours', hours);

// Handle index file separately
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/views/index.html'));
  });

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function () {
      console.log('Listening on port: ', app.get('port'));
  });
