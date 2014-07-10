/**
 * File: DataRetrieverAnalysis.test.js
 * Module: test::modelServer::dataManager::DatabaseAnalysisManager
 * Author: Alberto Garbui
 * Created: 20/06/14
 * Version: 1.0
 * Description: test del DataRetrieverAnalysis 
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

var retriever = rewire("../../../../maap_server/modelServer/dataManager/DatabaseAnalysisManager/DataRetrieverAnalysis.js");

describe("DataRetrieverAnalysis Unit Test: ", function() {

	describe("getModel", function() {
			
		it("deve ritornare -1 se l'array di modelli e' vuoto", function() {
			
			var array = [];
			retriever.__set__('DB', {model: array} );
			
			var model = retriever.getModel('col1');
			
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
			retriever.__set__('DB', {model: array} );
			
			var model = retriever.getModel('col3');
			
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
			retriever.__set__('DB', {model: array} );
			
			var model = retriever.getModel('col1');
			
			expect(model).to.equal('modelCol1');
					
		});
				
	});

	/*describe("getDocuments", function() {
	var getDocuments = require("../../../../maap_server/modelServer/dataManager/DatabaseAnalysisManager/DataRetrieverAnalysis.js").getDocuments;


		
	/*it("query con risultato nullo", function() {
			querylean.exec = function(callback){
			var err = false;
			var res = [];
			callback(err, res);
			};
			getDocuments(model,'','','','',0,100,'', function(res){
			expect(res.length).to.equal(0);
			});
	});

			

	it("query con risultato valido", function() {

	var model = {
		find:null
	}

	var query = {
		lean:null
	}

	var querylean = {
		exec:null
	}

	model.find = function(a,b,c){
		return query;
	};
		
	query.lean = function(){
		return querylean;
	};
			querylean.exec = function(callback){
			var err = false;
			var res =[];
			res.push({_id:0, name:'a', email:'aa'});//,{_id:1, name:'b', email:'bb'},{_id:2, name:'c', email:'cc'}];
			callback(err, res);
			};
			//console.log(model);
			//console.log(model.find(1,2,3).lean());
			getDocuments(model,'','','','',0,100,'', function(res){
			console.log(res);
			//expect(res.length).to.equal(1);
			//expect(res[1]._id).to.equal(1);
			//expect(res[2]._id).to.equal(2);
			});
	});
	});
	*/
	
	describe("getCollectionsList", function() {
	
	});

	describe("applyTrasformations", function() {
	
	});

	describe("sortDocumentsByLabels", function() {
	
		var documents = new Array();
		documents.push({label:'a', name:'aa', position:1});
		documents.push({label:'b', name:'bb', position:2});
		documents.push({label:'c',name:'cc', position:3});
		
		var keys = new Array();
		keys.push(['label']);
		keys.push(['name']);
		
		var resultDocuments = new Array();
		resultDocuments.push({label: 'a', name: 'aa'});
		resultDocuments.push({label: 'b', name: 'bb'});
		resultDocuments.push({label: 'c', name: 'cc'});
		
		var documentsReturn = retriever.sortDocumentsByLabels(documents,keys);
		
		it("valore del primo campo label sbagliato", function() {
			expect(documentsReturn[0].label).to.equal(resultDocuments[0].label);
		});
		it("valore del primo campo name sbagliato", function() {
			expect(documentsReturn[0].name).to.equal(resultDocuments[0].name);
		});
		it("valore del secondo campo label sbagliato", function() {
			expect(documentsReturn[1].label).to.equal(resultDocuments[1].label);
		});
		it("valore del secondo campo name sbagliato", function() {
			expect(documentsReturn[1].name).to.equal(resultDocuments[1].name);
		});
		it("valore del terzo campo label sbagliato", function() {
			expect(documentsReturn[2].label).to.equal(resultDocuments[2].label);
		});
		it("valore del terzo campo name sbagliato", function() {
			expect(documentsReturn[2].name).to.equal(resultDocuments[2].name);
		});
	});

	describe("getCollectionIndex", function() {
	
	});

	describe("getDocumentShow", function() {
	
	});

	describe("getDocumentShowEdit", function() {
	
	});
	
	describe("getDocumentShowEditNew", function() {
	
	});

	describe("updateDocument", function() {
	
	});

	describe("removeDocument", function() {
	

	});

}); //end DataRetrieverAnalysis Unit Test
