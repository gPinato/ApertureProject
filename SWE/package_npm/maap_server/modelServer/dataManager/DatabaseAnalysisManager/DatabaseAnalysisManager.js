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
//var collectionData = require('');

var DB = require('../../Database/MongooseDBFramework');

exports.sendCollectionsList = function(req, res){

	//ora la lista di collections e' statica ma andra' creata a partire 
	//dai dsl definiti per questo progetto
	var collectionsList = [];
	collectionsList.push('cars');
	collectionsList.push('models');
	collectionsList.push('playBoySouthAfrica');
	collectionsList.push('bennetsRulez');
	collectionsList.push('testCollection');
	res.send(JSonComposer.createCollectionsList(collectionsList));
}

exports.sendCollection  = function(req, res){
	var config = req.config;
	var collection_id = req.params.col_id;
	var column = req.query.column;
	var order = req.query.order;
	var page = req.query.page;
	
	//qui leggo il dsl relativo alla collection in posizione collection_id
	//eseguo la queri  usando column, order e page con il retriever
	// 
	
	var collection_name = 'auto';
		
	//NB. il recupero dei dati sul db è asincrono quindi uso una callback per eseguire
	//il restante codice solamente quando ho la risposta dal db :)
	retriever.getDocumentsList(collection_name, column, order, page, function(data){
	
		console.log('datamanager:' + data);
	
		res.send(JSonComposer.createCollection('bla',data,'bla'));
			
	});	
}

exports.sendDocument  = function(req, res){
	var config = req.config;
	var collection_id = req.params.col_id;
	var document_id = req.params.doc_id;
	
	//qui leggo il dsl relativo alla collection in posizione collection_id
	//eseguo la queri  usando column, order e page con il retriever
	// 
	var collection_name = 'auto';
	
	retriever.getDocument(collection_name, document_id, function(data){
	
		console.log('datamanager:' + data);
	
		res.send(JSonComposer.createDocument('bla',data,'bla'));
			
	});	
	
}