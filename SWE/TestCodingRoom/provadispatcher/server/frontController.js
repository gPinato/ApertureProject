// server/frontController.js
var dispatcher = require('./dispatcher')

module.exports = function(app)
{

	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');		
	});

	//se ricevo richieste GET di qualsiasi tipo controllo se � autenticato e rimando tutto 
	//al dispatcher! :)
	app.get('*', isLoggedIn, dispatcher.dispatch);

	//se ricevo richieste POST
	app.post('/testRequestPOST', isLoggedIn, function(req, res, err) {
		res.send("YEAH - JK got a POST!");
	});
	
};

//il front controller usa passport per l'autenticazione,
//questa funzione � utilizzata per controllare se l'utente � autenticato
function isLoggedIn(req, res, next)
{
	//controllo se l'utente � autenticato
	//if (req.isAuthenticated())
	if(1)
		return next();

	//altrimenti reindirizzo l'utente alla pagina principale
	res.redirect('/');
}
