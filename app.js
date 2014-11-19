
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , param = require('./routes/quer_parameter')
  , accesstoken= require('./routes/accessToken')
  , node_schedule = require ('node-schedule'); 
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users/:id',param.parameterfunction);
app.get('/users', user.list);
//app.get('/winner/finalist', param.


//access token here 
var access = new accesstoken(); 
var accessTokenString =""; 

//calls authenticate function from routes/accessToken.js 
access.authenticate("cfung58@uwo.ca", "Beaufighter_1", "activesight", function(err, token){
	 accessTokenString = token; 
	 console.log("Token: " , token);
}); 

app.use('/client', express.static('public'));

////////////


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});