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

describe("Test addUser:", function() {
var addUser = require("../../../maap_server/modelServer/dataManager/DatabaseUserManager/DataRetrieverUsers.js").addUser;
});

describe("Test getUserProfile:", function() {
var getUserProfile = require("../../../maap_server/modelServer/dataManager/DatabaseUserManager/DataRetrieverUsers.js").getUserProfile;
});

describe("Test updateUserProfile:", function() {
var updateUserProfile = require("../../../maap_server/modelServer/dataManager/DatabaseUserManager/DataRetrieverUsers.js").updateUserProfile;
});

describe("Test getUsersList:", function() {
var getUsersList = require("../../../maap_server/modelServer/dataManager/DatabaseUserManager/DataRetrieverUsers.js").getUsersList;
});

describe("Test updateUser:", function() {
var updateUser = require("../../../maap_server/modelServer/dataManager/DatabaseUserManager/DataRetrieverUsers.js").updateUser;
});

describe("Test removeUser:", function() {
var removeUser = require("../../../maap_server/modelServer/dataManager/DatabaseUserManager/DataRetrieverUsers.js").removeUser;
});





