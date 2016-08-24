var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('hours.db');
var http = require('http');
var server = http.createServer(app).listen(8080);

//Create new database table if it does not already exist.
db.run("CREATE table IF NOT EXISTS hours (user TEXT, monday INT default 0, tuesday INT default 0, wednesday INT default 0, thursday INT default 0, friday INT default 0, saturday INT default 0, sunday INT default 0)");

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
