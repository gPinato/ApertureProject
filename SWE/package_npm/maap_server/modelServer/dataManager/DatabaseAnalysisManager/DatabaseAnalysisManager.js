/**
 * File: DatabaseAnalysisManager.js
 * Module: maap_server::ModelServer::DataManager::DatabaseAnalysisManager
 * Author: Alberto Garbui
 * Created: 20/05/14
 * Version: 0.1
 * Description: gestione dati dal database di analisi
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

var path = require('path');
var retriever = require('./DataRetrieverAnalysis');
var indexManager = require('../IndexManager/IndexManager');
var JSonComposer = require('../JSonComposer');
//var DB = require('../../Database/MongooseDBAnalysis');

//invia al client la lista di collections definite dai vari dsl
exports.sendCollectionsList = function(req, res) {

	var collectionsList = require('../../DSL/collectionData/collectionsList.json');
	
	var collectionsArray = [];
	for(var i=0; i<collectionsList.length; i++)
	{
		collectionsArray.push(collectionsList[i].name);
		//collectionsArray.push(collectionsList[i].label); //bisogna inviare le labels e nomi 
	}
	res.send(JSonComposer.createCollectionsList(collectionsArray));
	
}

exports.sendCollection  = function(req, res) {
	var config = req.config;
	var collection_id = req.params.col_id;
	var column = req.query.column;
	var order = req.query.order;
	var page = req.query.page;
	
	var collection_name = req.params.col_id;
		
	//NB. il recupero dei dati sul db è asincrono quindi uso una callback per eseguire
	//il restante codice solamente quando ho la risposta dal db :)
	retriever.getDocumentsList(collection_name, column, order, page, function(data){
		
		res.send(JSonComposer.createCollection('bla',data,'bla'));
			
	});	
}

exports.sendDocument  = function(req, res){
	var config = req.config;
	var collection_id = req.params.col_id;
	var document_id = req.params.doc_id;
	
	var collection_name = collection_id;
	
	retriever.getDocument(collection_name, document_id, function(data){
		
		res.send(JSonComposer.createDocument('bla',data,'bla'));
			
	});	
	
}