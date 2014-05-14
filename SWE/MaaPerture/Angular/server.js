/**
 * Created by jack on 30/04/14.
 */
// set up ======================================================================
var express  = require('express');					// creo l'oggetto express
var app      = express(); 								// cosi creiamo la nostra applicazione con express
var port  	 = 8080; 									// imposto la porta del server
var app = module.exports = express();
app.configure(function() {
    app.use(express.static(__dirname + '/app')); 	// set the static files location /public/img will be /img for users
    app.use(express.logger('dev')); 					// log every request to the console
    app.use(express.cookieParser()); 					// read cookies (needed for auth)
    app.use(express.bodyParser()); 						// pull information from html in POST
    app.use(express.urlencoded()); // to support URL-encoded bodies

//    app.use(express.static(path.join(__dirname, 'templates')));
    app.use(app.router);
    app.set('views', __dirname + '/views');

});

app.get('/api/collection/:col_id', function(req, res){
    res.sendfile('/home/jack/Desktop/Repository/SWE/MaaPerture/Angular/app/colprova'+req.params.col_id+'.json');
});
app.get('/api/collection/:col_id/:doc_id', function(req, res){
    res.sendfile('/home/jack/Desktop/Repository/SWE/MaaPerture/Angular/app/docprova'+req.params.doc_id+'.json');
});
app.get('/api/collection/:col_id/:doc_id/edit', function(req, res){
    res.sendfile('/home/jack/Desktop/Repository/SWE/MaaPerture/Angular/app/docprova'+req.params.doc_id+'.json');
});

app.post('/api/collection/:col_id/:doc_id', function(req, res){
    console.log(JSON.stringify(req.body));
});


app.get('*', function(req, res){
    res.sendfile("/home/jack/Desktop/Repository/SWE/MaaPerture/Angular/app/index.html");
});



function isLoggedIn(req, res, next)
{
    //controllo se l'utente � autenticato
    //if (req.isAuthenticated())
    if(1)
        return next();

    //altrimenti reindirizzo l'utente alla pagina principale
    res.redirect('/');
}

// listen (start app with node server.js) ======================================
app.listen(port);										//avvio il server
console.log("MaaP listening on port " + port + " :)");