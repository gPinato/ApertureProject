/**
 * File: schemaGenerator.test.js
 * Module: test::modelServer::DSL
 * Author: Alberto Garbui
 * Created: 23/06/14
 * Version: 1.0
 * Description: test dello schemaGenerator
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 1.0 File creation
 ==============================================
 */
'use strict';

var chai = require('chai');
var should = chai.should();
var assert = chai.assert;
var expect = chai.expect;

var schemaGenerator = require("../../../maap_server/modelServer/DSL/schemaGenerator.js");

describe("Test getPopulatedCollection: ", function() {

	var populateArray = [];
	populateArray.push({collection: 'collection1', key: 'testkey1'});
	populateArray.push({collection: 'collection2', key: 'testkey2'});
		
	it("populateArray deve avere un oggetto contenente la chiave testkey2", function() {
		var result = schemaGenerator.getPopulatedCollection(populateArray, 'testkey2');
		expect(result).to.equal('collection2');
    }),
	
	it("populateArray non deve avere nessun oggetto contenente la chiave testkey3", function() {
		var result = schemaGenerator.getPopulatedCollection(populateArray, 'testkey3');
		expect(result).to.equal('');
    });

});

describe("Test arrayAddElement: ", function() {

	var array = [];
	array.push({key: 'key1'});
	array.push({key: 'key2'});
		
	it("resultArray non deve avere un nuovo campo", function() {
		var element = {key: 'key2'};
		var resultArray = schemaGenerator.arrayAddElement(element, array);
		expect(resultArray.length).to.equal(array.length);
    }),
	
	it("resultArray deve avere un nuovo campo contenente un oggetto con campo key == key3", function() {
		var element = {key: 'key3'};
		var resultArray = schemaGenerator.arrayAddElement(element, array);
		expect(resultArray.length).to.equal(3);
		expect(resultArray[2]).to.have.property('key');
		expect(resultArray[2].key).to.equal('key3');
    });
	
});

describe("Test generate: ", function() {

	var dslJson = require("./membersForSchemaGenerator.json");
	var config = require("./configForSchemaGenerator.js");

	var jsString = schemaGenerator.generate(config, dslJson);
		
	/*it("schema deve esportare schemaName con valore corretto", function() {
		expect(schema).to.have.property('schemaName');
		expect(schema.schemaName).to.equal('members');
	}),
	
	it("schema deve esportare uno schema valido", function() {
		expect(schema.schema).to.have.property('name');
		
	});*/

});