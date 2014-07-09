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

var DB = require('../../database/MongooseDBFramework');

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
		else if(!user){
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
	newUserData.email = req.body.email;
	newUserData.password = req.body.newpassword;
	
	//recupero dei vecchi dati utenti
	//var oldEmail = req.session.passport.user.email;
	var oldPassword = req.session.passport.user.password;
	
	//il controllo vecchia password non viene eseguito, 
	//la sicurezza si basa sul fatto che questa funzione deve essere
	//richiamata solamente se l'utente e' correttamente autenticato
	//if(oldPassword == req.body.oldPassword)
	//{
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
	//}else{
		//la vecchia password non corrisponde
	//	callback(false);
	//}
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
				else if(!users){
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

	var user = req.body;	
	var model = DB.users;
	
	var criteria = {};
	criteria._id = user.id;
	
	if(user.level == 'user')
	{
		user.level = 0;
	}else if(user.level == 'administrator')
	{
		user.level = 1;
	}else{
		callback(false);
		return;
	}
		
	var options = {};
	
	var newUserData = {};
	newUserData.email = user.email;
	if(user.newpassword != undefined)
		newUserData.password = user.newpassword;
	newUserData.level = user.level;
	
	var query = model.update(criteria, {$set: newUserData}, options);
	query.lean().exec( function(err, count){
		if(err){console.log('update user profile fallito: ' + err); callback(false);}
		else if(count==0){
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
