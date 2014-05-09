//DSL manager

var fs = require('fs'); 
var parser = require('./DSLParser');

var checkDSL = function() {

	//TODO caricare tutti i files dentro una cartella
	//carico il file DSL da testare
	var DSLstring = fs.readFileSync('./dsl.maap').toString();

	//provo ad eseguire il parser sul dsl..
	console.log("Eseguo il parser su dsl.maap...");
	var result = parser.parse(DSLstring);

	console.log("risultato: ");
	console.log(result);

	//salvo su file
	console.log("Salvo il risultato su ./collectionData.json...");
	fs.writeFileSync('./collectionData.json', result, 'utf-8', function (err) {
		if (err) {
			console.log("Errore nel salvataggio del risultato del parser!");
		} else {
			console.log("Salvato resultDSLstring.maap!");
		}
		}
	);

	console.log("Controllo se il risultato e' in formato JSON...");
	//provo ad eseguire il parser JSON per controllare se l'output è in formato JSON
	//var risultatoJSON = JSON.parse(result);
	//console.log(risultatoJSON.pretty());
};

exports.checkDSL = checkDSL;
