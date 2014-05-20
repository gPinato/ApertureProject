/**
 * Created by jack on 30/04/14.
 */
// set up ======================================================================
var express  = require('express');					// creo l'oggetto express
var app      = express(); 								// cosi creiamo la nostra applicazione con express
var port  	 = 8080; 									// imposto la porta del server
var app = module.exports = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.configure(function() {
    app.use(express.cookieParser()); 					// read cookies (needed for auth)

    app.use(express.session({ secret: 'keyboard cat' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(__dirname + '/app')); 	// set the static files location /public/img will be /img for users
    app.use(express.logger('dev')); 					// log every request to the console
    app.use(express.bodyParser()); 						// pull information from html in POST
    app.use(express.urlencoded()); // to support URL-encoded bodies

//    app.use(express.static(path.join(__dirname, 'templates')));
    app.use(app.router);
    app.set('views', __dirname + '/views');


});

//Imposto passport


passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function(email, password, done) {
        if (email.valueOf() === 'apertureswe@gmail.com' &&
            password.valueOf() === 'asdasd')
            return done(null, true);
        else
            return done(null, false);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});
// Define a middleware function to be used for every secured routes
var auth = function(req, res, next){
    if (!req.isAuthenticated()) res.send(401);
    else next();
}


app.get('/api/collection/:col_id', auth, function(req, res){
    res.sendfile('/home/jack/Desktop/Repository/SWE/MaaPerture/Angular/app/colprova'+req.params.col_id+'.json');
});
app.get('/api/collection/:col_id/:doc_id', auth, function(req, res){
    res.sendfile('/home/jack/Desktop/Repository/SWE/MaaPerture/Angular/app/docprova'+req.params.doc_id+'.json');
});
app.get('/api/collection/:col_id/:doc_id/edit',auth, function(req, res){
    res.sendfile('/home/jack/Desktop/Repository/SWE/MaaPerture/Angular/app/docprova'+req.params.doc_id+'.json');
});

app.put('/api/collection/:col_id/:doc_id', function(req, res){
    console.log(JSON.stringify(req.body));
    res.send(200);
});

app.post('/api/signup', function(req, res){
    console.log(JSON.stringify(req.body));
    res.send(200);
});

app.get('/api/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

app.post('/api/login', passport.authenticate('local'),function(req, res){
    res.send(req.user);
});



app.get('*', function(req, res){
    res.sendfile("/home/jack/Desktop/Repository/SWE/MaaPerture/Angular/app/index.html");
});


// listen (start app with node server.js) ======================================
app.listen(port);										//avvio il server
console.log("MaaP listening on port " + port + " :)");