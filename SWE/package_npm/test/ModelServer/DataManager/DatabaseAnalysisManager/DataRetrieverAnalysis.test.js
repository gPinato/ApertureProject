/**
 * File: DataRetrieverAnalysis.test.js
 * Module: test::ModelServer::DataManager
 * Author: 
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

describe("Test getModel:", function() {
//var getModel = require("../../../../maap_server/modelServer/dataManager/DatabaseAnalysisManager/DataRetrieverAnalysis.js").getModel;
});

/*describe("Test getDocuments:", function() {
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
describe("Test getCollectionsList:", function() {
//var getCollectionsList = require("../../../../maap_server/modelServer/dataManager/DatabaseAnalysisManager/DataRetrieverAnalysis.js").getCollectionsList;
});

describe("Test applyTrasformations:", function() {
//var applyTrasformations = require("../../../../maap_server/modelServer/dataManager/DatabaseAnalysisManager/DataRetrieverAnalysis.js").applyTrasformations;
});

describe("Test sortDocumentsByLabels:", function() {
	var sortDocumentsByLabels = require("../../../../maap_server/modelServer/dataManager/DatabaseAnalysisManager/DataRetrieverAnalysis.js").sortDocumentsByLabels;

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
	var documentsReturn = sortDocumentsByLabels(documents,keys);
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

describe("Test getCollectionIndex:", function() {
var getCollectionIndex = require("../../../../maap_server/modelServer/dataManager/DatabaseAnalysisManager/DataRetrieverAnalysis.js").getCollectionIndex;
});

describe("Test getDocumentShow:", function() {
var getDocumentShow = require("../../../../maap_server/modelServer/dataManager/DatabaseAnalysisManager/DataRetrieverAnalysis.js").getDocumentShow;
});

describe("Test getDocumentShowEdit:", function() {
var getDocumentShowEdit = require("../../../../maap_server/modelServer/dataManager/DatabaseAnalysisManager/DataRetrieverAnalysis.js").getDocumentShowEdit;
});

describe("Test updateDocument:", function() {
var updateDocument = require("../../../../maap_server/modelServer/dataManager/DatabaseAnalysisManager/DataRetrieverAnalysis.js").updateDocument;
});

/*describe("Test removeDocument:", function() {
var req = {
		app: {
			db: {
				user: {
					model: null
				}
			}
		},
		params: {
			id: 1
		},
		user: {
			email: "email"
		}
		};
	req.model = function () {
		return model;
	};
var removeDocument = require("../../../../maap_server/modelServer/dataManager/DatabaseAnalysisManager/DataRetrieverAnalysis.js").removeDocument;
var model = {
		safeFindById: null
	};
model.safeFindById = function (id, cb, eb) {
				var obj = {
					email: "m",
					level: "1"
				};

				cb(obj);
		};
	
	var User = req.model('users');

	User.safeFindById(req.params.id,
		function success(result){
			if ('a'=='a') {
				return true;
			}
			else{
				next(new MaapError(9001));
			}
		},
		function error(err){
			next(err);
		}
	);

});*/




