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


 /**
 * Aggiunge un utente al database degli utenti
 *
 *@param email - email dell'utente da aggiungere
 *@param password - password dell'utente da aggiungere
 *@param level - livello dell'utente da aggiungere
 *@param callback - funzione da chiamare al termine dell'esecuzione
 */
//
exports.addUser = function(email, password, level, callback) {
	var criteria = new DB.users({email:email, password: password, level: level});
	var query = criteria.save(function(err){
		 // se l'inserimento fallisce stampo un messaggio di errore
		if(err){
			console.log('impossibile aggiungere nuovo utente: ' + err);
			callback(false);
		}
		// se l'inserimento va a buon fine stampo un messaggio di conferma
		else{ 
			console.log('registrazione ok');
			callback(true);
		}
	});
};

 /**
 * Recupera il profilo di un utente
 *
 *@param user_id - id dell'utente da recuperare
 *@param callback - funzione da chiamare al termine dell'esecuzione
 */

var getUserProfile = function(user_id, callback) {
	DB.users.findOne({ _id: user_id },function(err,user){
		//  se la ricerca fallisce stampo un messaggio di errore
		if(err) { 
			console.log('errore recupero user profile: ' + err); callback({});
		}
		// se l'inserimento va a buon fine
		else 
			//se non trovo nessun risultato
			if(!user){
				console.log('no user!');
				callback({});
			}
			// se la ricerca ha dato un risultato e quindi è andato tutto correttamente
			else{
				// Passo user alla callback
				callback(user);
			}
	});
}; 
exports.getUserProfile = getUserProfile;

 /**
 * Aggiorna profilo utente
 *
 *@param req - richiesta del client
 *@param callback - funzione da chiamare al termine dell'esecuzione
 */


exports.updateUserProfile = function(req, callback) {
	var model = DB.users;
	
	var criteria = {};
	criteria._id = req.session.passport.user._id;
		
	var options = {};
	
	var newUserData = {};
	newUserData.email = req.body.email.toLowerCase();
	
	if(req.body.newpassword != undefined)
		newUserData.password = req.body.newpassword;
	
	//recupero dei vecchi dati utenti
	//var oldEmail = req.session.passport.user.email;
	var oldPassword = req.session.passport.user.password;
	
	//il controllo vecchia password non viene eseguito, 
	//la sicurezza si basa sul fatto che questa funzione deve essere
	//richiamata solamente se l'utente e' correttamente autenticato
	//if(oldPassword == req.body.oldPassword)
	//{
	
		// definisco la query di modifica
		var query = model.update(criteria, {$set: newUserData}, options);
		// eseguo la query e trasformo il risultato in JSON
		query.lean().exec( function(err, count){
			// se la query fallisce stampo un messaggio di errore
			if(err){
				console.log('update user profile fallito: ' + err); 
				callback(false);
			}
			// se la query è andata a buon fine
			else 
				// se non si è modificato alcun documento
				if(count == 0){
				// Passo false alla callback
					callback(false);
				}
				//se l'update avvenuto con successo
				else{
				// Passo true alla callback
					callback(true);
				}
		});
}; 

 /**
 * Recupera la lista utenti
 *
 *@param column - colonna sulla quale effettuare l'ordinamento
 *@param order - tipo di ordinamento
 *@param page - numero di pagina
 *@param perpage - numero di elementi per ogni pagina
 *@param callback - funzione da chiamare al termine dell'esecuzione
 */

//
exports.getUsersList = function(column, order, page, perpage, callback) {
	// creo un oggetto vuoto per le opzioni della query
	var options = {};
	// creo un oggetto vuoto per le opzioni di ordinamento della query
	var sort = {}; 
	//imposto le opzioni della query con i parametri passati
	sort[column] = order; 
	options.sort = sort; 
	options.limit = perpage;
	options.skip = page * options.limit;
	// creo un oggetto result per i risulati delle query
	var result = {};
	result.options = {};
	result.options.pages = 1;
	result.data = [];
	// eseguo la query per avere tutta la lista degli utenti
	DB.users.find({}, function(err, users){
		//  se la ricerca fallisce stampo un messaggio di errore
		if(err) { console.log('errore user list count: ' + err); callback(result); }
		//  se il risultato della ricerca è vuoto stampo un messaggio
		if(!users){
			console.log('no users!');
			callback(result); 
		}
		// se il risultato della ricerca non è vuoto
		else{
			//calcolo il numero di pagine
			result.options.pages = Math.floor(users.length / perpage);
			if((users.length % perpage) > 0) result.options.pages++;
			// definsco la query di ricerca tra gli utenti con le opzioni definite
			var query = DB.users.find({}, {}, options);	
			// eseguo la query e trasformo i risultati in JSON
			query.lean().exec( function(err,users){
				//  se la ricerca fallisce stampo un messaggio di errore
				if(err) { console.log('errore recupero user list: ' + err); callback(result); }
				else  
					//  se il risultato della ricerca è vuoto stampo un messaggio
					if(!users){
						console.log('no users!');
						callback(result); 
					}
					// se il risultato della ricerca non è vuoto e quindi è andato tutto correttamente
					else{
						result.data = users;
						// Passo result alla callback
						callback(result);
					}
			});			
		}
	});
}; 

/**
 * Update user per administrator
 *
 *@param req - richiesta del client
 *@param callback - funzione da chiamare al termine dell'esecuzione
 */

exports.updateUser = function(req, callback) {

	var user = req.body;	
	var model = DB.users;
	
	var criteria = {};
	// definisco l'id dell'utente da modificare
	criteria._id = user.id; 
	//se l'utente è di tipo user
	if(user.level == 'user')
	{
		user.level = 0;
	}else 
		//se l'utente è amministratore
		if(user.level == 'administrator')
	{
		user.level = 1;
	}else{
		// Passo false alla callback
		callback(false);
		return;
	}
		
	var options = {};
	
	var newUserData = {};
	newUserData.email = user.email.toLowerCase();
	if(user.newpassword != undefined)
		newUserData.password = user.newpassword;
	newUserData.level = user.level;
	// definisco la query per modificare l'utente secondo le opzioni
	var query = model.update(criteria, {$set: newUserData}, options);
	// eseguo la query e trasformo il risulatato in JSON
	query.lean().exec( function(err, count){
		//  se la modifica fallisce stampo un messaggio di errore
		if(err){console.log('update user profile fallito: ' + err); callback(false);}
		else
			//  se il risutato della modifica è vuoto
			if(count==0){
				// Passo false alla callback
				callback(false);
			}
			// se il risulato della mododifica non è vuoto e quindi è andato tutto correttamente
			else{
				callback(true);
		}
	});
}; 

/**
 * Rimuove un utente
 *
 *@param id - id dell'utente da rimuovere
 *@param callback - funzione da chiamare al termine dell'esecuzione
 */

exports.removeUser = function(id, callback) {
	var model = DB.users;
	var criteria = {};
	// definisco l'id da eliminare
	criteria._id = id; 
	// definisco la query di cancellazione
	var query = model.remove(criteria);
	// eseguo la query e trasformo il risulatto in json
	query.lean().exec( function(err, count){
		// se la cancellazione fallisce stampo un messaggio d'errore
		if(err){console.log('rimozione user fallita: ' + err); callback(false);}
		// se il risultato della cancellazione è vuoto
		if(count == 0) {
			callback(false);
		}
		// se il risultato della cancellazione non è vuoto e quindi è andato tutto correttamente
		else{
			callback(true);			
		}
	});
}; 
