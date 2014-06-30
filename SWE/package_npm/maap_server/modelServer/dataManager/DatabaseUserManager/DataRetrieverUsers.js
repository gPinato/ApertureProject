/**
 * File: DataRetrieverUsers.js
 * Module: maap_server::modelServer::dataManager::DatabaseUserManager
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
var getUserProfile = function(user_id, callback) {
	DB.users.findOne({ _id: user_id },function(err,user){
		if(err) { console.log('errore recupero user profile: ' + err); callback({});}
		if(!user){
			console.log('no user!');
			callback({});
		}else{
			callback(user);
		}
	});
}; 
exports.getUserProfile = getUserProfile;

//aggiorna profilo utente
exports.updateUserProfile = function(req, callback) {
	var model = DB.users;
	
	var criteria = {};
	criteria._id = req.session.passport.user._id;
		
	var options = {};
	
	var newUserData = {};
	newUserData.email = req.user.email;
	newUserData.password = req.user.password;
	
	//recupero dei vecchi dati utenti
	//var oldEmail = req.session.passport.user.email;
	var oldPassword = req.session.passport.user.password;
	
	if(oldPassword == req.user.oldPassword)
	{
		var query = model.update(criteria, {$set: newUserData}, options);
		query.lean().exec( function(err, count){
			if(err){console.log('update user profile fallito: ' + err); callback(false);}
			if(count == 0){
				//console.log('nessun risultato'); 
				callback(false);
			}else{
				//update avvenuto con successo
				callback(true);
			}
		});
	}else{
		//la vecchia password non corrisponde
		callback(false);
	}
}; 

//recupera la lista utenti
exports.getUsersList = function(column, order, page, perpage, callback) {

	var options = {};
	var sort = {};
	sort[column] = order;
	options.sort = sort;
	options.limit = perpage;
	options.skip = page * options.limit;

	var result = {};
	result.options = {};
	result.options.pages = 1;
	result.data = [];
	
	DB.users.find({}, function(err, users){
		if(err) { console.log('errore user list count: ' + err); callback(result); }
		if(!users){
			console.log('no users!');
			callback(result); 
		}else{
			//calcolo il numero di pagine
			result.options.pages = Math.floor(users.length / perpage);
			if((users.length % perpage) > 0) result.options.pages++;
			
			var query = DB.users.find({}, {}, options);	
			query.lean().exec( function(err,users){
				if(err) { console.log('errore recupero user list: ' + err); callback(result); }
				if(!users){
					console.log('no users!');
					callback(result); 
				}else{
					result.data = users;
					callback(result);
				}
			});			
		}
	});
}; 

//update user per administrator
exports.updateUser = function(req, callback) {

	var email = req.params.user_email;
	var user = req.body;
	
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

exports.removeUser = function(id, callback) {
	var model = DB.users;
	
	var criteria = {};
	criteria._id = id;
		
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
