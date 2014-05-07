//setUp gestione file e PEGjs
var fs = require('fs');     //gestione filestreams
var PEG = require('pegjs'); //pegjs ;)

//carico la grammatica
var grammaticaDSL = fs.readFileSync('./input/grammatica.js').toString();

//genero il parser con la grammatica
console.log("Genero il parser dalla grammatica.js...");

var parser = PEG.buildParser(grammaticaDSL, { 		//grammatica da utilizzare (stringa)
							 output: "source",		//output come stringa
							 optimize: "speed"		//ottimizzato per velocità di esecuzione
							 //optimize: "size"		//ottimizzato per compressine di codice
							});
			
//aggiusto il codice del parser come modulo esterno prima di salvarlo su file			
parser = "module.exports = " + parser + ";";

//ora lo salvo
console.log("Salvo il parser generato su ./output/parser.js...");
fs.writeFileSync('./output/parser.js', parser, 'utf-8', function (err) {
	if (err) {
		console.log("Errore nel salvataggio di parser.js!");
    } else {
		console.log("Salvato parser.js!");
    }
	}
);

//TEST di utilizzo del parser, carico il modulo esterno
var parserTest = require('./output/parser.js');
//carico il file DSL da testare
var DSLstring = fs.readFileSync('./input/provaDSL.maap').toString();

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
//provo ad eseguire il parser JSON per controllare se l'output è in formato JSON
//var risultatoJSON = JSON.parse(result);
//console.log(risultatoJSON.pretty());

console.log("**********************FINEEEEEEEEEE***********************");
