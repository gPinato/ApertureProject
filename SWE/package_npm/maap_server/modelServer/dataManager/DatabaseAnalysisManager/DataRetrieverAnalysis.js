/**
 * File: DataRetrieverAnalysis.js
 * Module: maap_server::ModelServer::DataManager::DatabaseAnalysisManager
 * Author: Alberto Garbui
 * Created: 20/05/14
 * Version: 0.1
 * Description: recupero dati dal database di analisi
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

//per ora uso DBframework..
var DB = require('../../Database/MongooseDBFramework');
//ma poi sara' da cambiare con MongooseDBAnalysis che contiene lo schema delle 
//collections definite dal dsl 

exports.getDocumentsList = function(collection_name, column, order, page, callback) {

	DB.users.find({}, '_id email password' ,function(err,documents){
		if(err) { console.log('errore lettura documents!'); return done(err); }
		if(!documents){
			console.log('nessun document presente in questa collection');
		}else{
			console.log('ecco il risultato');
			console.log(documents);
			callback(documents);
		}	
	});
	
}


exports.getDocument = function(collection_name, document_id, callback) {

	DB.users.findOne({_id : document_id},function(err,documents){
		if(err) { console.log('errore lettura documents!'); /*return done(err);*/ }
		if(!documents){
			console.log('nessun document presente in questa collection');
		}else{
			console.log('ecco il risultato');
			console.log(documents);
			callback(documents);
		}	
	});
}
	