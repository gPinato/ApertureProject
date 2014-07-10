/**
 * File: IndexManager.test.js
 * Module: test::modelServer::dataManager::IndexManager
 * Author: Alberto Garbui
 * Created: 22/06/14
 * Version: 1.0
 * Description: test dell' IndexManager
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

var indexManager = rewire("../../../../maap_server/modelServer/dataManager/IndexManager/IndexManager.js");

describe("IndexManager Unit Test: ", function() {
	
	describe("getModel", function() {
			
		it("deve ritornare -1 se l'array di modelli e' vuoto", function() {
			
			var array = [];
			indexManager.__set__('DB', {model: array} );
			
			var model = indexManager.getModel('col1');
			
			expect(model).to.equal(-1);
					
		});
		
		it("deve ritornare -1 se la collection specificata non e' presente nell'array dei modelli", function() {
			
			var array = [
				{
					name: 'col1',
					model: 'modelCol1'
				},
				{
					name: 'col2',
					model: 'modelCol2'
				}
			];
			indexManager.__set__('DB', {model: array} );
			
			var model = indexManager.getModel('col3');
			
			expect(model).to.equal(-1);
					
		});
		
		it("deve ritornare il modello della collection specificata", function() {
			
			var array = [
				{
					name: 'col1',
					model: 'modelCol1'
				},
				{
					name: 'col2',
					model: 'modelCol2'
				}
			];
			indexManager.__set__('DB', {model: array} );
			
			var model = indexManager.getModel('col1');
			
			expect(model).to.equal('modelCol1');
					
		});
				
	});
	
	
	describe("addQuery", function() {
		
		/*
		it("", function() {
			
			
			indexManager.addQuery(collection_name, select);
			
		});
		*/
		
	});
	
	describe("resetQueries", function() {
			
		it("deve ritornare false se c'e' un errore nella cancellazione della collection queries", function() {
			
			indexManager.__set__('queryModel', {modelName: 'modelName'} );
			indexManager.__set__('connection', {db: {dropCollection: function(modelName, callback){callback(true, 'data');} }} );
			
			indexManager.resetQueries(function(response){
				expect(response).to.equal(false);
			});
		
		});
		
		it("deve ritornare true se la cancellazione della collection queries avviene con successo", function() {
			
			indexManager.__set__('queryModel', {modelName: 'modelName'} );
			indexManager.__set__('connection', {db: {dropCollection: function(modelName, callback){callback(false, 'data');} }} );
			
			indexManager.resetQueries(function(response){
				expect(response).to.equal(true);
			});
		
		});
		
	});
	
	describe("getQueries", function() {
	
		
		it("deve ritornare un oggetto vuoto se il recupero della lista query fallisce", function() {
			
			indexManager.__set__('queryModel', {find: function(query, callback){callback(true, false);} } );
			
			var page = 0;
			var perpage = 10;
			var n_elements = 10;
	
			indexManager.getQueries(page, perpage, n_elements, function(response){
				expect(response.data.length).to.equal(0);
				expect(response.options.pages).to.equal(undefined);
			});
		
		});
		
		it("deve ritornare un oggetto vuoto se non sono presenti query nel DB", function() {
			
			indexManager.__set__('queryModel', {find: function(query, callback){callback(false, false);} } );
			
			var page = 0;
			var perpage = 10;
			var n_elements = 10;
			
			indexManager.getQueries(page, perpage, n_elements, function(response){
				expect(response.data.length).to.equal(0);
				expect(response.options.pages).to.equal(undefined);
			});
		
		});
		
		//TODO, here 
		
	});
	
	
	describe("getIndex", function() {
	
		var collectionList = [
			{
				name: 'col1',					
			},
			{
				name: 'col2',
			}			
		];
		
		indexManager.__set__('collectionList', collectionList );
		
		var indexes = {
			_id_: 'idfields',
			index1Name: 'fieldsIndex1',
			index2Name: 'fieldsIndex2',
			index3Name: 'fieldsIndex3'
		}
		var db = {collection: function(collectionName){ return {indexInformation: function(callback){callback(false, indexes );} }; } };
		var page = 2;
		var indexesPerPage = 10;
						
		it("deve ritornare la lista degli indici totali senza gli indici di default _id_", function() {
			indexManager.getIndex(db, page, indexesPerPage, function(response){
				expect(response.length).to.equal(2*3);
			});
		});
		
		it("deve ritornare il nome dell'indice", function() {
			indexManager.getIndex(db, page, indexesPerPage, function(response){
				expect(response[0].indexName).to.equal('index1Name');
			});
		});
		
		it("deve ritornare il nome della collection a cui l'indice si riferisce", function() {
			indexManager.getIndex(db, page, indexesPerPage, function(response){
				expect(response[0].collectionName).to.equal('col1');
			});
		});
		
		it("deve ritornare la lista di campi a cui l'indice si riferisce", function() {
			indexManager.getIndex(db, page, indexesPerPage, function(response){
				expect(response[0].indexFields).to.equal('fieldsIndex1');
			});
		});
			
	});
	
	describe("createIndex", function() {
	
		
		it("deve ritornare false se c'e' un errore nel recupero della query nel DB", function() {
			
			indexManager.__set__('queryModel', {find: function(where, select){ return {lean: function(){return {exec: function(callback){callback(true, false);} };} }; } } );
			
			var query_id = 'testIDquery';
			var name_index = 'testIndexName';
			
			indexManager.createIndex(query_id, name_index, function(response){
				expect(response).to.equal(false);
			});
		
		});
		
		it("deve ritornare false se la query cercata non e' presente nel DB", function() {
			
			indexManager.__set__('queryModel', {find: function(where, select){ return {lean: function(){return {exec: function(callback){callback(false, false);} };} }; } } );
			
			var query_id = 'testIDquery';
			var name_index = 'testIndexName';
			
			indexManager.createIndex(query_id, name_index, function(response){
				expect(response).to.equal(false);
			});
		
		});
		
		it("deve ritornare false se la query cercata ritorna un array con vuoto", function() {
			
			indexManager.__set__('queryModel', {find: function(where, select){ return {lean: function(){return {exec: function(callback){callback(false, [] );} };} }; } } );
			
			var query_id = 'testIDquery';
			var name_index = 'testIndexName';
			
			indexManager.createIndex(query_id, name_index, function(response){
				expect(response).to.equal(false);
			});
		
		});
		
		/*
		it("deve ritornare false se la creazione dell'indice non ha successo", function() {
			
			indexManager.__set__('queryModel', {find: function(where, select){ return {lean: function(){return {exec: function(callback){callback(false, [] );} };} }; } } );
			
			var query_id = 'testIDquery';
			var name_index = 'testIndexName';
			
			indexManager.createIndex(query_id, name_index, function(response){
				expect(response).to.equal(false);
			});
		
		});
		
		it("deve ritornare true se la creazione dell'indice ha successo", function() {
			
			indexManager.__set__('queryModel', {find: function(where, select){ return {lean: function(){return {exec: function(callback){callback(false, [] );} };} }; } } );
			
			var query_id = 'testIDquery';
			var name_index = 'testIndexName';
			
			indexManager.createIndex(query_id, name_index, function(response){
				expect(response).to.equal(true);
			});
		
		});
		*/	
			
	});
	
	describe("deleteIndex", function() {
	
		it("deve ritornare true se la cancellazione dell'indice e' avvenuta con successo", function() {
			
			var db = {collection: function(collectionName){ return {dropIndex: function(indexName, callback){ callback(false);} } } };
			var indexName = 'testIndice';
			var collectionName = 'testCollection';
			
			indexManager.deleteIndex(db, indexName, collectionName, function(response){
				expect(response).to.equal(true);
			});
		
		});
		
		it("deve ritornare false se la cancellazione dell'indice fallisce", function() {
			
			var db = {collection: function(collectionName){ return {dropIndex: function(indexName, callback){ callback(true);} } } };
			var indexName = 'testIndice';
			var collectionName = 'testCollection';
			
			indexManager.deleteIndex(db, indexName, collectionName, function(response){
				expect(response).to.equal(false);
			});
		
		});
		
		/*
		it("deve richiamare dropIndex passandogli il nome dell'indice da eliminare", function() {
			
			var dropIndex = function(){};
			var spy = chai.spy(dropIndex);
			
			var db = {collection: function(collectionName){ return {dropIndex: function(indexName, callback){ callback(indexName);} } } };
			var indexName = 'testIndice';
			var collectionName = 'testCollection';
			
			indexManager.deleteIndex(db, indexName, collectionName, function(response){
				expect(spy).to.have.been.called();
			});
		
		});
		
		it("deve richiamare collection passandogli il nome della collection", function() {
			
			var dropIndex = function(){};
			var spy = chai.spy(dropIndex);
			
			var db = {collection: function(collectionName){ return {dropIndex: function(indexName, callback){ callback(indexName);} } } };
			var indexName = 'testIndice';
			var collectionName = 'testCollection';
			
			indexManager.deleteIndex(db, indexName, collectionName, function(response){
				expect(spy).to.have.been.called();
			});
		
		});
		*/
		
	});

	
}); //end IndexManager Unit Test
