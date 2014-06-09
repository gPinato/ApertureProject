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

//invia al client la lista di collections definite dai vari dsl
exports.sendCollectionsList = function(req, res) {

	var collectionsList = retriever.getCollectionsList();
	res.send(JSonComposer.createCollectionsList(collectionsList));
	
}

exports.sendCollection  = function(req, res) {
	var config = req.config;
	var collection_name = req.params.col_id;
	var column = req.query.column;
	var order = req.query.order;
	var page = req.query.page;
		
	//NB. il recupero dei dati sul db è asincrono quindi uso una callback per eseguire
	//il restante codice solamente quando ho la risposta dal db :)
	retriever.getCollectionIndex(collection_name, column, order, page, function(data){
		
		res.send(JSonComposer.createCollection(	data.labels,	//etichette
												data.documents,	//dati
												data.options	//opzioni
												));
			
	});	
}

exports.sendDocument = function(req, res){
	var config = req.config;
	var collection_name = req.params.col_id;
	var document_id = req.params.doc_id;
	
	retriever.getDocumentShow(collection_name, document_id, function(data){
		
		res.send(JSonComposer.createDocument( 	data.labels,	//etichette
												data.rows,		//dati
												data.options	//opzioni
											));
			
	});	
	
}

exports.updateDocument = function(req, res) {
	var config = req.config;
	var collection_name = req.params.col_id;
	var document_id = req.params.doc_id;
	var newDocumentData = {};	//campi dati del document
	
	retriever.updateDocument(collection_name, document_id, newDocumentData, function(data){
	
		//res.send();
	
	});

}

exports.removeDocument = function(req, res) {
	var config = req.config;
	var collection_name = req.params.col_id;
	var document_id = req.params.doc_id;

	retriever.removeDocument(collection_name, document_id, function(data){
	
		//res.send();
		//che fare qui?
	
	});
	
}
