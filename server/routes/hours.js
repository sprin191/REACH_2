var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');

var passOk = undefined;

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
      res.json({ passOk: true });
      console.log(passOk);
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
  res.send();
});

router.get('/videos', function (req, res) {
request({
  method: 'GET',
  url: 'https://proofapi.herokuapp.com/videos?page&per_page',
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': authToken
  }}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
  res.send(body);
});
});

router.post('/add-video', function (req, res) {
//console.log(req.body);
request({
  method: 'POST',
  url: 'https://proofapi.herokuapp.com/videos',
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': authToken
  },
  body: JSON.stringify(req.body)
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
  res.send(body);
});
});

router.post('/upVote/:id', function (req, res) {
var id = req.params.id;
//console.log("upVote!", req.params.id);
request({
  method: 'POST',
  url: 'https://proofapi.herokuapp.com/videos/' + req.params.id + '/votes',
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': authToken
  },
  body: "{  \"opinion\": 1}"
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
  res.send(body);
});
});

router.post('/downVote/:id', function (req, res) {
var id = req.params.id;
//console.log("downVote!", req.params.id);
request({
  method: 'POST',
  url: 'https://proofapi.herokuapp.com/videos/' + req.params.id + '/votes',
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': authToken
  },
  body: "{  \"opinion\": -1}"
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
  res.send(body);
});
});

router.post('/view', function (req, res) {
//console.log("view!", req.body);
request({
  method: 'POST',
  url: 'https://proofapi.herokuapp.com/views',
  headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': authToken
  },
  body: JSON.stringify(req.body)
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
  res.send(body);
});
});

module.exports = router;
