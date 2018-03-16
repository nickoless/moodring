/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

require('dotenv').config();
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var app = express();

app.use(express.static(__dirname + '/public')).use(cookieParser());

app.get('/test', (req, res) => {
  console.log('it works');
  res.send('it works');
});

console.log('Listening on 8888');
app.listen(8888);
