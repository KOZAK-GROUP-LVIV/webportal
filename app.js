var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var users = require('./routes/users');
var chat = require('./routes/chat');
var news = require('./routes/news');
var interview = require('./routes/inquirer.js')
var cookie = require('cookie');
var connect = require('connect');
var cookieSession = require('cookie-session');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const usersModel = require('./models/userModel');
const passportSocketIo = require("passport.socketio");

var express = require('express');
var app = express();
app.set('port',3000);

passport.use(new Strategy(
  function(username, password, cb) {

	  usersModel.loginUser({login:username}).then(user=>{
	  	 if(!user){
	  	 	return cb(null, false)
	  	 }
	  	 if(user.password == password){
	  		 return	cb(null, user);
	  	 }
	  	 if(!user.password != password){
	  	 	return	cb(null, false);
	  	 }
	  	res.json({isSucces:true, user:result})
	  }).catch(err=>{
	  	console.log(err)
	  	return cb(err);
	  })

}));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(user, cb) {
  
  usersModel.findById(user._id).then(user=>{
  	return cb(null, user);
  }).catch(err=>{
  	return cb(err)
  })

})



/*
var sessionStore = new MongoStore({
      url: 'mongodb://localhost/sessions',
      port: 27017
    });
*/

var sessionStore = new MongoStore({
      url: 'mongodb://maxim:123987bonus@ds139761.mlab.com:39761/webportalkozakgroup'
    });





app.use(session({
    secret:"tasmanialDeywool", // Keep your secret key
    key:'sid', 
    store:sessionStore
}));

// Use passport
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: true,
    credentials: true
}));




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', users);


app.use('/', chat);
app.use('/', news);
app.use('/', interview);



app.get('/js/:filename', (req, res)=>{
  res.sendFile(`${__dirname}/public/frontend/dist/${req.params.filename}`);
})
app.get('/images/avatars/:filename', (req, res)=>{
  res.sendFile(`${__dirname}/public/images/${req.params.filename}`)
})

app.get('*', (req, res)=>{
  res.sendFile(__dirname + '/public/index.html');
})









// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



let server = app.listen(app.get('port'));
var io = require('socket.io').listen(server);
global.io = io;

require('./routes/socket.js')(io, sessionStore, __dirname);





function onAuthorizeSuccess(data, accept){
  console.log('successful connection to socket.io');
 
  // The accept-callback still allows us to decide whether to 
  // accept the connection or not. 
  accept(null, true);
 
  // OR 
 
}

function onAuthorizeFail(data, message, error, accept){
  if(error)
    throw new Error(message);
  console.log('failed connection to socket.io:', message);
 
  // We use this callback to log all of our failed connections. 
  accept(null, false);
 
  // OR 
 
  // If you use socket.io@1.X the callback looks different 
  // If you don't want to accept the connection 
  if(error)
    accept(new Error(message));
  // this error will be sent to the user as a special error-package 
  // see: http://socket.io/docs/client-api/#socket > error-object 
}



/*
http.listen(3000, function(){
  console.log('listening on *:3000');
});

*/

module.exports = app;




