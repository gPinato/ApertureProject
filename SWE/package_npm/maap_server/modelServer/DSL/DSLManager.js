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
	
	//eseguo la pulizia della cartella collectionData
	//dai files json ed i modelli
	var collectionDataPath = __dirname + '/collectionData';
	var list = fs.readdirSync(collectionDataPath);
	list.forEach(function(file) {
		var filePath = collectionDataPath + '/' + file;
        var stat = fs.statSync(filePath);
		var extension = path.extname(file);
        if (stat && stat.isFile() && (extension == '.json' || extension == '.js')) {
			fs.unlink(filePath, function (err) {
				if (err){
					console.log('errors while cleaning collectionData\'s file: ' + file);
					throw err;
				}
				if(config.app.env == 'development') { //messaggio solo in fase di development
					console.log('successfully deleted collectionData file: ' + file);
				}
			});
		}
	});
			
	//carica ogni file dsl e genera il file json dopo opportuni controlli
	var results = [];
    var list = fs.readdirSync(config.static_assets.dsl);
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
					
			//carico il nome del file
			var filename = result.collection.name;
					
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
			var saveFile = __dirname + '/collectionData/' + filename + '.json';
			console.log('saving ' + saveFile);
			fs.writeFileSync(saveFile, result, 'utf-8', function (err) {
					if (err) {
						console.error('error writing dsl\'s json file: ' + saveFile);
						throw err;
					} 
					console.log(saveFile + ' saved!');
				}
			);
						
			
			//qui per lo stesso file viene generato lo schema per mongoose
			
			/* ESEMPIO DI SCHEMA:
			var mongoose = require('mongoose');
			exports.schema = new mongoose.Schema({
				email: { 
						type: String, 
				},
				password: {
					type: String
				}
			});
			*/
			
			//COMPLETARE QUI...
			var schema = '//maaperture auto-generated mongoose schema:\n\n';
			schema += 'var mongoose = require(\'mongoose\');\n';
			schema += 'exports.schema = new mongoose.Schema({\n';
			
			var type = 'String';
			schema += 'email: { type: ' + type + '},\n';
			schema += 'password: { type: ' + type + '}\n';			
			
			
			schema += '});\n'			
			
			//salvo su file
			var saveFile = __dirname + '/collectionData/' + filename + '_schema.js';
			console.log('saving ' + saveFile);
			fs.writeFileSync(saveFile, schema, 'utf-8', function (err) {
					if (err) {
						console.error('error writing schema file: ' + saveFile);
						throw err;
					} 
					console.log(saveFile + ' saved!');
				}
			);			
			
		}//end if
    });

};

exports.checkDSL = checkDSL;
