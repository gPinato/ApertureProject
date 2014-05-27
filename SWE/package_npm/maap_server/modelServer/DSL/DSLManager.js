/**
 * File: DSLManager.js
 * Module: maap_server::modelServer::DSL
 * Author: Alberto Garbui
 * Created: 10/05/14
 * Version: 0.1
 * Description: gestione file dsl
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

//DSL manager
// controlla la presenza di file dsl nell'apposita cartella definita
//nel file di configurazione e cerca di eseguire il parser di ogni file
// utilizzando DSLParser.js che controlla la correttezza dei campi dati 
// del dsl.

var fs = require('fs'); 
var path = require('path'); 
var DSLparser = require('./DSLParser');

var checkDSL = function(app) {

	var config = app.config;
	var results = [];
    var list = fs.readdirSync(config.static_assets.dsl);
	var i = 0;
    list.forEach(function(file) {
		
        var filePath = config.static_assets.dsl + '/' + file;
        var stat = fs.statSync(filePath);
		var extension = path.extname(file);
        if (stat && stat.isFile() && extension == '.maap') {
			results.push(filePath);
			console.log('found dsl: ' + file);			
			console.log('parsing ' + file + '...');
			
			//provo a leggere il dsl
			try{
				var DSL = require(filePath);
			}catch(err){
				console.error('parsing error!');
				console.error('check your dsl file syntax: ' + file);
				throw err;
			}
			
			//ora uso DSLParser per controllare la correttezza dei dati nel DSL:
			var result = DSLparser.parseDSL(DSL);

			console.log('result: ' + result);
			
			//se corretto mi ritorna un JSON con tutti i campi dati corretti
			
			
			console.log('errors checking...');
			//test se il risultato è in formato JSON
			result = JSON.stringify(result, null, '\t');
			try {
				var risultatoJSON = JSON.parse(result);
			} catch(err) {
				console.error('parsing result error! [invalid_JSON]');
				console.error('check maaperture dsl parser: DSLParser.js');
				throw err; 
			}
			
			//salvo su file
			var saveFile = __dirname + '/collectionData/result_' + i + '.json';
			console.log('saving ' + saveFile);
			fs.writeFileSync(saveFile, result, 'utf-8', function (err) {
					if (err) {
						console.log("error writing result file!");
						throw err;
					} 
				}
			);
			
			console.log("data saved!");
						
			i++;
		}
    });

};

exports.checkDSL = checkDSL;
