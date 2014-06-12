/**
 * File: IndexManager.js
 * Module: maap_server::ModelServer::DataManager::IndexManager
 * Author: Alberto Garbui
 * Created: 20/05/14
 * Version: 0.1
 * Description: gestione indici
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

var getModel = function(collection_name) {
	var DB = require('../../Database/MongooseDBAnalysis');
	var array = DB.model;
	
	for(var i=0; i<array.length; i++)
	{
		if(array[i].name == collection_name)
		{
			return array[i].model;
		}
	}
	return -1;
}

exports.addQuery = function(collection_name, select) {
	var queryModel = require('../../Database/MongooseDBFramework').query;
	queryModel.find(collection_name, function(err,data){
		if(err)
			console.log('Impossibile recuperare lista query con la collection: '+collection_name);
		else
			if(data){
				for(var i = 0;i<data.length;i++){
					if(data[i].select.length == select.length){
						var countmatch = 0;
						for(var j = 0;j<select.length;j++){
							if(data[i].select[select[j]] != undefined)
								countmatch++;		
						}
						if(contamatch == select.length){
							var counter = data[i].counter++;
							queryModel.update(select, {$set:{counter: counter}}).exec(function(err,count){
								if(err){console.log('update counter fallito'); }
								if(count==0){
									console.log('impossibile aggiornare la query.'); 
								}
							});
						}
						else{
							var criteria = new queryModel({collection_name:collection_name, select:select, counter: 0});
							var query = criteria.save(function(err){
								if(err)
									console.log('inserimento query fallito');
							});
						}
						
					}
				}//for
			}//if
			else{
				var criteria = new queryModel({collection_name:collection_name, select:select, counter: 0});
					var query = criteria.save(function(err){
						if(err)
							console.log('inserimento query fallito');
					});
			}
	
	});

}

exports.getQueries = function(n_elements, callback) {
	var DB = require('../../Database/MongooseDBFramework');

}

exports.createIndex = function(query_id, callback) {

	var model = getModel('teams');
	
}

exports.deleteIndex = function(index_id, callback) {


	var model = getModel('teams');
}
