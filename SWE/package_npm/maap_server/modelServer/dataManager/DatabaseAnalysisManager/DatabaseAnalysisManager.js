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

exports.inviaCOL  = function(req, res){
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
	
		if(collection_id==1)	//per la collection 1
		{
			//richiamo il json composer per generare un json statico , quindi passo 
			//parametri a caso per ora...
			res.send(JSonComposer.create('bla',data,'bla'));
		}else{
			res.sendfile(path.join(config.static_assets.dir,'colprova'+collection_id+'.json'));
		}	
	});	
}

exports.inviaDOC  = function(req, res){
	var config = req.config;
	var collection_id = req.params.col_id;
	var document_id = req.params.doc_id;
	
	//qui leggo il dsl relativo alla collection in posizione collection_id
	//eseguo la queri  usando column, order e page con il retriever
	// 
	var collection_name = 'auto';
	
	retriever.getDocumentsView(collection_name, document_id, function(data){
	
		console.log('datamanager:' + data);
	
		if(collection_id==1)	//per la collection 1
		{
			//richiamo il json composer per generare un json statico , quindi passo 
			//parametri a caso per ora...
			res.send(JSonComposer.createDoc('bla',data,'bla'));
		}else{
			res.sendfile(path.join(config.static_assets.dir, 'docprova'+document_id+'.json'));
		}	
	});	
	
}