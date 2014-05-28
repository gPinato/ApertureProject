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

exports.inviaCOL  = function(req, res){
	var config = req.config;
	res.sendfile(path.join(config.static_assets.dir,'colprova'+req.params.col_id+'.json'));
}

exports.inviaDOC  = function(req, res){
	var config = req.config;
	res.sendfile(path.join(config.static_assets.dir, 'docprova'+req.params.doc_id+'.json'));
}