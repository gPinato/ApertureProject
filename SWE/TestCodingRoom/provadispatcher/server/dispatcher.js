// server/dispatcher.js

exports.dispatch = function(req, res, next) {

	//qui è possibile accedere alla request ed a tutti i suoi campi
	//vedi (www.expressjs.com/api.html#app.VERB)
	//forse lo switch è brutto, ma per ora era un modo veloce di 
	//implementare un piccolo dispatcher
	switch(req.path)
	{
		case '/testRequestGET': 
			res.send(req.path);
			break;
		
		case '/pippo': 
			res.send("I'm pippo!");
			break
			
		case '/JK': 
			res.send("JK rock!!");
			break
	
	}
};