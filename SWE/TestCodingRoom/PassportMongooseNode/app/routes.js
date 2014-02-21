// app/routes.js

var Collection = require('./models/document');

module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		if (req.isAuthenticated())
			res.render('profile.ejs', {
				user : req.user // get the user out of session and pass to template
			});
		else
			res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {
		if (req.isAuthenticated())
			res.render('profile.ejs', {
				user : req.user // get the user out of session and pass to template
			});
		else
			// render the page and pass in any flash data if it exists
			res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		if (req.isAuthenticated())
			res.render('profile.ejs', {
				user : req.user // get the user out of session and pass to template
			});
		else
			// render the page and pass in any flash data if it exists
			res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.cookie('userid', req.user, {maxAge: 2592000000});
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		res.clearCookie('userid');
		req.logout();
		res.redirect('/');
	});
	
	
	//************API RESTful
	
	app.get('/api/docs', isLoggedIn, function(req, res) {

		// mongoose cerca tutti i docs
		Collection.find(function(err, docs) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(docs); // restituisce tutti i documents in formato JSON
		});
	});

	// crea un nuovo document dentro la collection e restituisce la lista dei documents totali
	app.post('/api/addDoc', isLoggedIn, function(req, res) {

		// crea un document nella collection, le informazioni arrivano dalle richieste AJAX - Angular
		Collection.create({
			nome : req.body.text,
			info : 'Booom Shakalaka!'
		}, function(err, doc) {
			if (err)
				res.send(err);

			// cerca tutti i documents dentro la collections e li ritorna al chiamante
			Collection.find(function(err, docs) {
				if (err) 
					res.send(err)
				res.json(docs);
			});
		});

	});

	// delete a todo
	app.delete('/api/docs/:doc_id', isLoggedIn, function(req, res) {
		Collection.remove({
			_id : req.params.doc_id
		}, function(err, docs) {
			if (err)
				res.send(err);

			//restituisce la lista aggiornata
			Collection.find(function(err, docs) {
				if (err)
					res.send(err)
				res.json(docs);
			});
		});
	});
	
	
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
