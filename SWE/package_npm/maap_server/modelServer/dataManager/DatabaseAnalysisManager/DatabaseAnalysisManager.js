/**
 * File: DatabaseAnalysisManager.js
 * Module: maap_server::modelServer::dataManager::DatabaseAnalysisManager
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

var sendCollection  = function(req, res) {
	var config = req.config;
	var collection_name = req.params.col_id;
	var column = req.query.column;
	var order = req.query.order;
	var page = req.query.page;
		
	//NB. il recupero dei dati sul db è asincrono quindi uso una callback per eseguire
	//il restante codice solamente quando ho la risposta dal db :)
	retriever.getCollectionIndex(collection_name, column, order, page, function(data){
		
		if(data.documents == undefined)
		{
			res.send(404);
		}else{
			res.send(JSonComposer.createCollection(	data.labels,	//etichette
													data.documents,	//dati
													data.options	//opzioni
												   ));
		}
	});	
}

exports.sendDocument = function(req, res){
	var config = req.config;
	var collection_name = req.params.col_id;
	var document_id = req.params.doc_id;
	
	retriever.getDocumentShow(collection_name, document_id, function(data){
		
		if(data.rows == undefined)
		{
			res.send(404);
		}else{
			res.send(JSonComposer.createDocument( 	data.labels,	//etichette
													data.rows		//dati
												));
		}
	});	
	
}

exports.sendDocumentEdit = function(req, res){
	var config = req.config;
	var collection_name = req.params.col_id;
	var document_id = req.params.doc_id;
	console.log('_________docEDIT____________');
	retriever.getDocumentShowEdit(collection_name, document_id, function(data){
		
		if(data.rows == undefined)
		{
			res.send(404);
		}else{
			res.send(JSonComposer.createDocument( 	data.labels,	//etichette
													data.rows,		//dati
													data.options	//opzioni
												));
		}
	});	
	
}

exports.sendDocumentEditNew = function(req, res){
	var config = req.config;
	var collection_name = req.params.col_id;
	var document_id = req.params.doc_id;
	console.log('_________docEDITnew____________');
	retriever.getDocumentShowEditNew(collection_name, document_id, function(document2edit){
		
		//TODO decidere cosa fare se il risultato e' vuoto (collection non presente nel db e/o collection vuota)
		console.log(document2edit);
		if(document2edit == {})
		{
			res.send(document2edit); //per il momento invio sempre i dati anche se vuoti
			//res.send(404);
		}else{
			res.send(document2edit); //invio tutti i dati in formato JSON puro
		}
	});	
	
}

exports.updateDocument = function(req, res) {
	var config = req.config;
	var collection_name = req.params.col_id;
	var document_id = req.params.doc_id;
	
	console.log('_________docUPDATE____________');
	retriever.updateDocument(collection_name, document_id, req.body, function(success){
		if(success)
		{
			res.send(200);
		}else{
			res.send(401);
		}	
	});

}

exports.removeDocument = function(req, res) {
	var config = req.config;
	var collection_name = req.params.col_id;
	var document_id = req.params.doc_id;
	
	console.log('_________docREMOVE____________');
	//console.log(JSON.stringify(req.body));
	retriever.removeDocument(collection_name, document_id, function(success){
		if(success)
		{
			res.send(200);
		}else{
			res.send(400);
		}	
	});
	
}

//gestione query - indexManager:

//elimina la lista di query
exports.resetQueries = function(req, res) {

	indexManager.resetQueries(function(done){
		if(done)
		{
			res.send(200);
		}else{
			res.send(400);
		}	
	});
}

//risponde con la lista delle query piu' utilizzate
exports.getTopQueries = function(req, res) {

	var queriesPerPage = req.config.adminConfig.queriesPerPage || 20;
	var numberOfQueries2show = req.config.adminConfig.queriesToShow || 10;
	
	indexManager.getQueries(req.query.page,			//numero di pagina
							queriesPerPage,			//numero di query per pagina
							numberOfQueries2show,	//numero di query da visualizzare
							function(queries){
								res.send(JSonComposer.createQueriesList(queries.data, queries.options));							
							});
}

//risponde con la lista degli indici presenti nel database di analisi
exports.getIndexesList = function(req, res) {

	var db = req.dataDB;
	var indexesPerPage = req.config.adminConfig.indexesPerPage || 100;
	var page = 1;
	//var page = req.params.page;
	
	indexManager.getIndex(db, page, indexesPerPage, function(indexes){
	
		var options = {};
		options.pages = Math.floor(indexes.length / indexesPerPage);
		if((indexes.length  % indexesPerPage) > 0) options.pages++;
		
		res.send(JSonComposer.createIndexesList(indexes, options));
	});	
}

exports.createIndex = function(req, res) {

	var query_id = req.body.id;
	var index_name = req.body.indexName;
	indexManager.createIndex(query_id, index_name, function(done){
		if(done)
		{
			res.send(200);
		}else{
			res.send(400);
		}		
	});
}

exports.deleteIndex = function(req, res) {

	var indexName = req.params.index_name;
	var collectionName = req.params.col_name;
	var db = req.dataDB;
	indexManager.deleteIndex(db, indexName, collectionName, function(done){
		if(done)
		{
			res.send(200);
		}else{
			res.send(400);
		}	
	});
}

exports.sendCollection = sendCollection;
