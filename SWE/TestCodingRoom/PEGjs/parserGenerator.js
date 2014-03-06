//setUp gestione file e PEGjs
var fs = require('fs');     //gestione filestreams
var PEG = require('pegjs'); //pegjs ;)

//carico la grammatica
var grammaticaDSL = fs.readFileSync('./input/grammatica.js').toString();

//genero il parser con la grammatica
console.log("Genero il parser dalla grammatica.js...");

var parser = PEG.buildParser(grammaticaDSL, { 		//grammatica da utilizzare (stringa)
							 output: "source",		//output come stringa
							 optimize: "speed"		//ottimizzato per velocit� di esecuzione
							 //optimize: "size"		//ottimizzato per compressine di codice
							});
			
//aggiusto il codice del parser come modulo esterno prima di salvarlo su file			
parser = "module.exports = " + parser + ";";

//ora lo salvo
console.log("Salvo il parser generato su ./output/parser.maap...");
fs.writeFileSync('./output/parser.maap', parser, 'utf-8', function (err) {
	if (err) {
		console.log("Errore nel salvataggio di parser.maap!");
    } else {
		console.log("Salvato parser.maap!");
    }
	}
);

//TEST di utilizzo del parser, carico il modulo esterno
var parserTest = require('./output/parser.maap');
//carico il file DSL da testare
var DSLstring = fs.readFileSync('./input/dsl.maap').toString();

//provo ad eseguire il parser sul dsl..
console.log("Eseguo il parser su dsl.maap...");
var result = parserTest.parse(DSLstring);

console.log("risultato: ");
console.log(result);

//salvo su file
console.log("Salvo il risultato su ./output/resultDSLstring.maap...");
fs.writeFileSync('./output/resultDSLstring.maap', result, 'utf-8', function (err) {
	if (err) {
		console.log("Errore nel salvataggio del risultato del parserTest!");
    } else {
		console.log("Salvato resultDSLstring.maap!");
    }
	}
);

console.log("Controllo se il risultato e' in formato JSON...");
//provo ad eseguire il parser JSON per controllare se l'output � in formato JSON
//var risultatoJSON = JSON.parse(result);
//console.log(risultatoJSON.pretty());

console.log("**********************FINEEEEEEEEEE***********************");
