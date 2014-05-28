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

exports.inviaCOL  = function(req, res){
	var config = req.config;
	var collection_id = req.params.col_id;
	var column = req.query.column;
	var order = req.query.order;
	var page = req.query.page;
	if(collection_id==1)	//per la collection 1
	{
		//richiamo il json composer per generare un json statico , quindi passo 
		//parametri a caso per ora...
		res.send(JSonComposer.create('bla','bla','bla'));
	}else{
		res.sendfile(path.join(config.static_assets.dir,'colprova'+collection_id+'.json'));
	}
}

exports.inviaDOC  = function(req, res){
	var config = req.config;
	res.sendfile(path.join(config.static_assets.dir, 'docprova'+req.params.doc_id+'.json'));
}