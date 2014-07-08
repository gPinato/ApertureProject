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
var rewire = require('rewire');

var retriever = rewire("../../../../maap_server/modelServer/dataManager/DatabaseUserManager/DataRetrieverUsers.js");

describe("Test addUser:", function() {
	
	it("inserimento utente deve essere eseguito con successo", function(done) {
		
		retriever.__set__('addUser.criteria', function(callback){callback(true);} );
		
		retriever.addUser('email','password',0,function(done){
			expect(done).to.equal(true);
		});
	
	});
	
});

describe("Test getUserProfile:", function() {

	it("getUserProfile deve restituire un errore e lista vuota se ", function(done) {
	
		retriever.__set__('DB', {users: {findOne: function(obj, callback){callback(true,{user: 'testUser'});}}} );

		var emptyDoc = {};
		
		retriever.getUserProfile('iduser',function(done){
			expect(done).to.equal(emptyDoc);
		});
		
	});
	
	it("getUserProfile deve restituire l'utente se il recupero ha successo", function(done) {
	
		retriever.__set__('DB', {users: {findOne: function(obj, callback){callback(false, {user: 'testUser'});}}} );

		retriever.getUserProfile('iduser',function(done){
			expect(done).to.equal({user: 'testUser'});
		});
		
	});

});

describe("Test updateUserProfile:", function() {
var updateUserProfile = require("../../../../maap_server/modelServer/dataManager/DatabaseUserManager/DataRetrieverUsers.js").updateUserProfile;
});

describe("Test getUsersList:", function() {
var getUsersList = require("../../../../maap_server/modelServer/dataManager/DatabaseUserManager/DataRetrieverUsers.js").getUsersList;
});

describe("Test updateUser:", function() {
var updateUser = require("../../../../maap_server/modelServer/dataManager/DatabaseUserManager/DataRetrieverUsers.js").updateUser;
});

describe("Test removeUser:", function() {
var removeUser = require("../../../../maap_server/modelServer/dataManager/DatabaseUserManager/DataRetrieverUsers.js").removeUser;
});





