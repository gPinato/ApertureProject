/**
 * File: DatabaseAnalysisManager.test.js
 * Module: test::modelServer::dataManager::DatabaseAnalysisManager
 * Author: Alberto Garbui
 * Created: 22/06/14
 * Version: 1.0
 * Description: test del DatabaseAnalysisManager
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 1.0 File creation
 ==============================================
 */

var chai = require('chai');
var should = chai.should();
var assert = chai.assert;
var expect = chai.expect;
var spies = require('chai-spies');
var rewire = require('rewire');
chai.use(spies);

var manager = rewire("../../../../maap_server/modelServer/dataManager/DatabaseAnalysisManager/DatabaseAnalysisManager.js");

describe("DatabaseAnalysisManager Unit Test: ", function() {

	describe("sendCollectionsList", function() {
			
					
	});
	
	describe("sendCollection", function() {
			
					
	});
	
	describe("sendDocument", function() {
			
					
	});
	
	describe("sendDocumentEdit", function() {
			
					
	});
	
	describe("sendDocumentEditNew", function() {
			
					
	});
	
	describe("updateDocument", function() {
			
					
	});
	
	describe("removeDocument", function() {
			
					
	});
	
	describe("resetQueries", function() {
			
					
	});
	
	describe("getTopQueries", function() {
			
					
	});
	
	describe("getIndexesList", function() {
			
					
	});
	
	describe("createIndex", function() {
	
		it("deve rispondere con un codice 400 se la creazione dell'indice non ha successo", function() {
			
			manager.__set__('indexManager', {createIndex: function(query_id, index_name, callback){callback(false);}} );
			
			var req = { body: {id: 'ID', indexName: 'indexName'}};
			
			manager.createIndex(req, {send: function(responseCode){
				expect(responseCode).to.equal(400);
			}});
		
		});	
		
		it("deve rispondere con un codice 200 se la creazione dell'indice non ha successo", function() {
			
			manager.__set__('indexManager', {createIndex: function(query_id, index_name, callback){callback(true);}} );
			
			var req = { body: {id: 'ID', indexName: 'indexName'}};
			
			manager.createIndex(req, {send: function(responseCode){
				expect(responseCode).to.equal(200);
			}});
		
		});	
					
	});
	
	describe("deleteIndex", function() {
	
		it("deve rispondere con un codice 400 se la rimozione dell'indice non ha successo", function() {
			
			manager.__set__('indexManager', {deleteIndex: function(db, indexName, collectionName, callback){callback(false);}} );
			
			var req = { params: {index_name: 'indexName', col_name: 'colName'}, dataDB: {}};
			
			manager.deleteIndex(req, {send: function(responseCode){
				expect(responseCode).to.equal(400);
			}});
		
		});
		
		it("deve rispondere con un codice 200 se la rimozione dell'indice ha successo", function() {
			
			manager.__set__('indexManager', {deleteIndex: function(db, indexName, collectionName, callback){callback(true);}} );
			
			var req = { params: {index_name: 'indexName', col_name: 'colName'}, dataDB: {}};
			
			manager.deleteIndex(req, {send: function(responseCode){
				expect(responseCode).to.equal(200);
			}});
		
		});
					
	});
	
}); //end DatabaseAnalysisManager Unit Test
