/**
 * File: run.js
 * Module: test
 * Author: Alberto Garbui
 * Created: 20/06/14
 * Version: 1.0.0
 * Description: avvio test con mocha
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';
var Mocha = require('mocha');
var fs = require('fs');

//creo una nuova istanza di mocha
var mocha = new Mocha({timeout: 60000, reporter: 'spec', ui: 'bdd'});

/**
 * cerca ricorsivamente i files *.test.js dentro la directory e li aggiunge a mocha
 *
 *@param directory - directory da leggere
 */
var mochaAddFile = function(directory) {

	var list = fs.readdirSync(directory);
	
	//per tutti i files presenti nella directory
	list.forEach(function(file) {
		var filePath = directory +  '/' + file;
		var stat = fs.statSync(filePath);
		if(stat && stat.isDirectory() && filePath.indexOf('coverage') == -1)
		{
			//se e' una cartella diversa da coverage richiamo ricorsivamente 
			//la funzione
			mochaAddFile(filePath);
			
		}else if (stat && stat.isFile() && filePath.indexOf('.test.js') > -1) {
		
			//se e' un file *.test.js lo mostro su console e lo aggiungo su mocha
			console.log('found! ' + filePath);
			mocha.addFile(filePath);
		}
	}); 
};

/**
 * Cerca i files di test ed avvia mocha per eseguirli
 *
 */
var runTest = function() {
   
		//cerco dei files di test nella cartella corrente
		mochaAddFile('./');  

		//avvio mocha
        mocha.run(function (failures) {
			process.exit(failures);
		});
		
};

//avvio i test
runTest();
