var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('hours.db');

//Create new database table if it does not already exist.
db.run("CREATE table IF NOT EXISTS hours (user TEXT, monday INT default 0, tuesday INT default 0, wednesday INT default 0, thursday INT default 0, friday INT default 0, saturday INT default 0, sunday INT default 0)");

var passOk = undefined;
var username = undefined;
var userHours = null;

var users = [
	'Ashley',
	'Dave',
	'Jim',
	'Ralph',
	'Jessica',
	'Mary'
];

var passwords = [
	'1234',
	'password',
	'12345',
	'12345678',
	'test',
	'admin'
];

router.post('/login', function (req, res) {
  console.log("LOGIN", req.body);
  passOk = false;
	users.forEach(function(user, index) {
		if(user == req.body.username && req.body.password == passwords[index]) {
			passOk = true;
      username = req.body.username;
      res.json({ passOk: true });
      console.log(passOk);
      console.log(username);
		}
});
  if (passOk === false) {
  res.json({ passOk: false });
  console.log(passOk);
  }
});

router.get('/checkAuth', function (req, res) {
  if (passOk === true) {
    res.json({ passOk: true });
  } else {
    res.json({ passOk: false });
  }
});

router.get('/logout', function (req, res) {
  passOk = undefined;
  console.log(passOk);
  res.send();
});

router.get('/userData', function (req, res) {

  			db.get('select * from hours where user="' + username + '"', undefined, function(err, row) {
  				console.log('query returned');

  				if(row) {
  					console.log('found record');
  					userHours = row;
  				} else {
  					console.log('inserting');
  					db.run('insert into hours(user) values("' + username + '")');
  					userHours = {
  						monday: 0,
  						tuesday: 0,
  						wednesday: 0,
  						thursday: 0,
  						friday: 0,
  						saturday: 0,
  						sunday: 0
  					};
  				}
  			});

  			var checkResult = function() {
  				if(userHours === null) {
  					setTimeout(checkResult, 2000);
  				} else {
            res.send(userHours);
  				}
  			};

  			checkResult();
});

router.post('/updateHours', function (req, res) {
			console.log(req.body);
      userHours = req.body;

			db.run('update hours set sunday=' + req.body.sunday + ', monday=' + req.body.monday + ', tuesday=' + req.body.tuesday + ', wednesday=' + req.body.wednesday + ', thursday=' + req.body.thursday + ', friday=' + req.body.friday + ', saturday=' + req.body.saturday + ' where user="' + req.body.user + '"');

      res.send(userHours);
});

module.exports = router;
