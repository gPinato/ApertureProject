/**
 * File: DataRetrieverUsers.js
 * Module: maap_server::ModelServer::DataManager::DatabaseUserManager
 * Author: Alberto Garbui
 * Created: 20/05/14
 * Version: 0.1
 * Description: recupero dati dal database degli utenti
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

var DB = require('../../Database/MongooseDBFramework');

//aggiunge un utente al database degli utenti
exports.addUser = function(email, password, level, callback) {
	var criteria = new DB.users({email:email, password: password, level: level});
	var query = criteria.save(function(err){
		if(err){
			console.log('impossibile aggiungere nuovo utente: ' + err);
			callback(false);
		}else{
			console.log('registrazione ok');
			callback(true);
		}
	});
};

//recupera il profilo di un utente
exports.getUserProfile = function(email, callback) {
	DB.users.findOne({ email: email },function(err,user){
		if(err) { console.log('errore recupero user profile: ' + err); callback({});}
		if(!user){
			console.log('no user!');
			callback({});
		}else{
			callback(user);
		}
	});
}; 

//aggiorna profilo utente
exports.updateUserProfile = function(user, callback) {
	var model = DB.users;
	
	var criteria = {};
	criteria._id = user.id;
		
	var options = {};
	
	var newUserData = {};
	newUserData.email = user.email;
	newUserData.password = user.password;
	
	var query = model.update(criteria, {$set: newUserData}, options);
	query.lean().exec( function(err, count){
		if(err){console.log('update user profile fallito: ' + err); callback(false);}
		if(count==0){
			//console.log('nessun risultato'); 
			callback(false);
		}else{
			//update avvenuto con successo
			callback(true);
		}
	});
}; 

//recupera la lista utenti
exports.getUsersList = function(callback) {
	DB.users.find({},function(err,users){
		if(err) { console.log('errore recupero user list: ' + err); callback([]); }
		if(!users){
			console.log('no users!');
			callback([]); 
		}else{
			callback(users);
		}
	});
}; 

//update user per administrator
exports.updateUser = function(email, user, callback) {
	var model = DB.users;
	
	var criteria = {};
	criteria._id = user.id;
		
	var options = {};
	
	var newUserData = {};
	newUserData.email = email;
	newUserData.password = user.password;
	newUserData.level = user.level;
	
	var query = model.update(criteria, {$set: newUserData}, options);
	query.lean().exec( function(err, count){
		if(err){console.log('update user profile fallito: ' + err); callback(false);}
		if(count==0){
			//console.log('nessun risultato'); 
			callback(false);
		}else{
			//update avvenuto con successo
			callback(true);
		}
	});
}; 

exports.removeUser = function(email, callback) {
	var model = DB.users;
	
	var criteria = {};
	criteria.email = email;
		
	var query = model.remove(criteria);
	query.lean().exec( function(err, count){
		if(err){console.log('rimozione user fallita: ' + err); callback(false);}
		if(count == 0) {
			callback(false);
		}else{
			//rimozione avvenuta con successo
			callback(true);			
		}
	});
}; 
