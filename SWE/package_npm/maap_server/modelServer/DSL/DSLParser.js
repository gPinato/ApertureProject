// qui ci va una funzione che controlla se tutti i campi dati 
// del dsl sono coerenti (testo, valori numerici, funzioni javascript, etc..)
// e ritorna un file JSON

var JSparser = require('./JavascriptParser');

var parseDSL = function(DSLstring) {

	var JSONresult = {}
	
	var collection = DSLstring.collection;
	
	console.log('questo e\' il parser DSL per la collection ' + collection.name);
	
	var stringaJavascript = 'function a(b){return b+1;}';
	
	console.log('provo a controllare la correttezza della funzione javascript...');
	
	//tento il parsing del file javascript
	try {
		var result = JSparser.parse(stringaJavascript);
	} catch(err) {
		console.error('parsing error!');
		console.error('check your function syntax!');
		throw err; 
	}
	
	//ritorno il JSON con tutti i campi del DSL
	return JSONresult;
}

exports.parseDSL = parseDSL;