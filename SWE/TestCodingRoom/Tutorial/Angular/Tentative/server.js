// set up ======================================================================
var express  = require('express');						// creo l'oggetto express
var app      = express(); 								// cosi creiamo la nostra applicazione con express
var port  	 = 8080; 									// imposto la porta del server

app.configure(function() {
    app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
    app.use(express.logger('dev')); 					// log every request to the console
    app.use(express.cookieParser()); 					// read cookies (needed for auth)
    app.use(express.bodyParser()); 						// pull information from html in POST
    app.use(express.json());       // to support JSON-encoded bodies
    app.use(express.urlencoded()); // to support URL-encoded bodies
});

// frontController ======================================================================
app.get('/req', function(req, res) {
    res.sendfile("response.json");
});

app.post('/addshop', function(sReq){

    var id = req.body.id,
        title = req.body.title,
        des = req.body.description,
        price = req.body.price;


});
app.all('/*', function(req, res,next) {
    // Just send the index.html for other files to support HTML5Mode
    res.sendfile('public/index.html');
    //next.sendfile("response.json");
});


// listen (start app with node server.js) ======================================
app.listen(port);										//avvio il server
console.log("MaaP listening on port " + port + " :)");
