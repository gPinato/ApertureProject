/**
 * File: IndexManager.js
 * Module: maap_server::ModelServer::DataManager::IndexManager
 * Author: Michele Maso + Fabio Miotto ;D
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
	var findQueries = queryModel.find({collection_name: collection_name});
	findQueries.lean().exec(function(err,data){
		if(err)
		{
			console.log('Impossibile recuperare lista query con la collection: '+collection_name);
		}else{
			if(data.length == 0)
			{
				var criteria = new queryModel({collection_name:collection_name, select:select, counter: 1});
				criteria.save(function(err){
					if(err)
					{
						console.log('inserimento query fallito 1');
					}
				});
			}else{
				var contadata = 0;
				for(var i = 0;i<data.length;i++){
					if(data[i].select.length == select.length){
						var countmatch = 0;
						for(var key in select){
							if(data[i].select[key] != undefined)
							{
								countmatch++;		
							}
						}
						if(countmatch == Object.keys(select).length){
							var counter = data[i].counter + 1;
							var id2update = data[i]._id;
							queryModel.update({_id: id2update}, {$set:{counter: counter}}).exec(function(err,count){
								if(err){console.log('update counter fallito'); }
								if(count==0){
									console.log('impossibile aggiornare la query.'); 
								}
							});
						}else{
							contadata++;
						}
					}
				}//for
				
				if(contadata == data.length)
				{
					//qui non ho fatto nessun update, quindi inserisco
					var criteria = new queryModel({collection_name:collection_name, select:select, counter: 1});
					criteria.save(function(err){
						if(err)
						{
							console.log('inserimento query fallito 2');
						}
					});
				}
			}//else	
		}
	});
}

exports.resetQueries = function(callback) {
	var queryModel = require('../../Database/MongooseDBFramework').query;
	var connection = require('../../Database/MongooseDBFramework').connection;
	//console.log(queryModel.modelName);
	connection.db.dropCollection(queryModel.modelName, function(err,data){
		if(err){
			console.log('Impossibile cancellare la collection '+queryModel.modelName);
			callback(false);
		}
		else{
			//console.log(data);
			callback(true);
		}
	});
}

exports.getQueries = function(page, perpage, n_elements, callback) {
	var DB = require('../../Database/MongooseDBFramework');
	var queryModel = require('../../Database/MongooseDBFramework').query;
	var options = {};
	
	options.skip = page * perpage;
	options.limit = perpage;
	options.sort = {counter:'desc'};
	
	var result = {};
	result.data = [];
	result.options = {};
	
	queryModel.find({}, function(err, queries){
		if(err) { console.log('errore recupero query list: ' + err); callback(result); }
		if(!queries){
			console.log('no queries!');
			callback(result);
		}else{
			result.options.pages = Math.floor(queries.length / perpage);
			if((queries.length % perpage) > 0) result.options.pages++;
			
			var query = queryModel.find({},{},options);
			query.lean().exec(function(err,data){
				if(err){
					console.log('Impossibile ritornare le query');
					callback(result);
				}
				if(!data)
				{
					console.log('Non ci sono query da visualizzare');
				}else{
					result.data = data;
				}
				callback(result);
			});
		}		
	});
}

exports.getIndex = function(callback) {

	var model = getModel('teams');
	
	callback({});	//momentaneamente restituisco la lista vuota
	
}

exports.createIndex = function(query_id,  name_index, callback) {
	//var query_id = '5399ad538beb2a5c22fbf900';
	var DB = require('../../Database/MongooseDBFramework');
	var queryModel = require('../../Database/MongooseDBFramework').query;
	var where = {};
	where['_id'] = query_id;
	var select = {};
	var query = queryModel.find(where,select);
	query.lean().exec(function(err,data){
		if(err){
			console.log('Impossibile ritornare la query dell\' indice');
			callback(false);
		}
		if(!data)
		{
			console.log('Errore _id query cercata');
			callback(false);
		}else{
			//console.log(data);
			var collection_name = data[0].collection_name;			
			var fieldIndex = data[0].select;
			var index = {};
			for(var key in fieldIndex){
				index[key] = 1;
			}
			//console.log(index);
			var nameindex = {};
			nameindex.name = name_index;
			var collectionSchema = require('../../DSL/collectionData/'+collection_name+'_schema').schema;
			collectionSchema.index(index,nameindex);
			//console.log(collectionSchema);
			var collectionModel = getModel(collection_name);
			
			collectionModel.ensureIndexes(function(err){
				if(err)
				{
					console.log('Impossibile creare l\'indice');
					callback(false);
				}else{
					//indice creato correttamente
					callback(true);
				}
			});
			
		}
	});
}

exports.deleteIndex = function(name_index, callback) {
	
}
