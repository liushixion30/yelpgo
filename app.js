
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');


var oracledemo = require('./routes/oracledemo');
var login = require('./routes/login');
var register = require('./routes/register');
var user_register = require('./routes/user-register');
var restaurants = require('./routes/restaurants');
var friends_updates  = require('./routes/friendsupdates');
var personal_activities = require('./routes/personalactivities');
var add_friends = require('./routes/addfriends');
var add_review = require('./routes/addreview');
var add_activity = require('./routes/addactivity');

var app = express();
GLOBAL.userProfile = '';

passport.serializeUser(function(user, done) {
  done(null, user);
});
 
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: "1659474010942337",
    clientSecret: "9329edb56a1b743322e54f0b41485cb9",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
	process.nextTick(function() {
		userProfile = profile;
		console.log(userProfile);
	    done(null, profile);
	  });
  }
));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize());
app.use(passport.session());


app.use('/oracledemo',oracledemo);
app.use('/login',login);
app.use('/',login);
app.use('/register',register);
app.use('/user-register',user_register);
app.use('/restaurants',restaurants);
app.use('/friendsupdates',friends_updates);
app.use('/personalactivities',personal_activities);
app.use('/',login);
app.use('/addfriends',add_friends);
app.use('/addReview', add_review);
app.use('/addActivity',add_activity);
app.get('/auth/facebook', passport.authenticate('facebook',{authType: 'reauthenticate', scope: ['email']}));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/restaurants',
failureRedirect: '/login'}));

app.get('/logout', function(req, res){req.logout(); res.redirect('/login');});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;