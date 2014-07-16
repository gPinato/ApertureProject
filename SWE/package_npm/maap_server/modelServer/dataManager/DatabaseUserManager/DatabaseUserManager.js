/**
 * File: DatabaseUserManager.js
 * Module: maap_server::modelServer::dataManager::DatabaseUserManager
 * Author: Alberto Garbui
 * Created: 20/05/14
 * Version: 0.1
 * Description: gestione dati dal database degli utenti
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
   //mostra tutti i warning possibili
'use strict';
var path = require('path');
//richiedo il modulo per il data retriever users
var retriever = require('./DataRetrieverUsers');
//richiedo il modulo per MongosseDBFramework
var DB = require('../../database/MongooseDBFramework');
//richiedo il modulo per il JSonComposer
var JSonComposer = require('../JSonComposer');

/**
 * controlla che la mail non sia gia presente nel sistema durante la registrazione
 *
 *@param req - richiesta del client
 *@param res - risposta per il client
 */
exports.checkMail = function(req, res) {

	//stampo sulla console un messaggio di controllo email
	console.log('controllo mail ' + req.body.field);
	var email2check = req.body.field;
	
	//controllo se la mail è indefinita
	if(email2check != undefined)
		email2check = email2check.toLowerCase();
	 
	 //conto nel database quante email presenti a quella da controllare ci sono
	DB.users.count({
  		email: email2check
    }, function (err, count) {
		//controllo se il numero di occorrenze è ==0, allora non esiste nessuna mail
        if (count === 0) {
			//stampo sulla console un messaggio di mail non presente
			console.log('nessuna mail presente');
			//invio uno stato HTTP 304
			res.send(304);
        } else {
			//il numero di occorrenze è diverso da 0, quindi mail presente
			//stampo sulla console un messaggio di utente già presente
			console.log('utente gia presente');
			//invio al client uno stato HTTP 400 di insuccesso
			res.send(400);
        }
    });	
};

/**
 * viene gestita la registrazione di un utente
 *
 *@param req - richiesta del client
 *@param res - risposta per il client
 */
exports.userSignup = function(req, res, next) {
	//stampo sulla console un messaggio di registrazione utente
	console.log('registrazione utente');
	console.log(JSON.stringify(req.body));
	
	//imposto il livello di un utente normale
	var level = 0; //livello zero utente semplice
	
	//controllo se le due password per la registrazione coincidono
	if(req.body.pwd1 != req.body.pwd2)
	{
		//se le due password sono diverse allora non posso registrare l'utente
		//stampo sulla console che la registrazione è fallita
		console.log('richiesta registrazione fallita: passwords doesn\'t match!');
		//invio al client uno stato HTTP 400 che indica registrazione fallita
		res.send(400);
		return;
	}
	
	//prendo la mail inserita dall'utente
	var userMail = req.body.email.toLowerCase();
	
	//controllo che l'utente non sia presente
	DB.users.count({
  		email: userMail
    }, function (err, count) {
        //controllo il numero di occorrenze
		if (count == 0) {
			//se il numero di occorrenze è 0 allora l'utente non è presente
			//chiamo addUser del retriever per inserire l'utente
			retriever.addUser(userMail, req.body.pwd1, level, function(success){
				//controllo se l'inserimento ha avuto successo o no
				if(success)
				{
					//se l'inserimento ha avuto successo allora prendo le credenziali inserite dall'utente
					req.body = {email: userMail, password: req.body.pwd1, level: level};
					next();
				}else{
					//se l'inserimento non è andato a buon fine, allora stampo sulla console un messaggio di registrazione fallita
					console.log('richiesta registrazione fallita: inserimento nel db fallito');
					//invio uno stato HTTP al client di insuccesso
					res.send(400);
				}	
			});
        } else {
		//se entro qui allora non posso registrare il client in quanto la mail è gia presente
			//stampo sulla console un messaggio di registrazione fallita
			console.log('richiesta registrazione fallita: utente gia presente');
			//invio uno stato HTTP al client di insuccesso
			res.send(400);
        }
    });	
	
};

/**
 * richiede la lista dei dati del proprio profilo utente
 *
 *@param req - richiesta del client
 *@param res - risposta per il client
 */
exports.sendUserProfile = function(req, res) {
	//prendo l'id dell'user
	var user_id = req.session.passport.user._id;
	//chiamo getUserProfile di retriever per farmi restituire i dati dell'utente
	retriever.getUserProfile(user_id, function(user){
		//invio i dati al client dopo averli "impacchettati" con il JSonComposer
		res.send(JSonComposer.createUserProfile(user));
	});
};

//req.session.passport.user        contiene _id, email, password, level

/**
 * richiede la lista dei dati del proprio profilo per editarlo
 *
 *@param req - richiesta del client
 *@param res - risposta per il client
 */
exports.sendUserProfileEdit = function(req, res) {
	//prendo l'id dell'user
	var user_id = req.session.passport.user._id;
	console.log(JSON.stringify(req.session.passport.user));
	//chiamo getUserProfile di retriever per farmi restituire i dati del profilo da modificare
	retriever.getUserProfile(user_id, function(user){
		//invio i dati al client dopo averli "impacchettati" con il JSonComposer
		res.send(JSonComposer.createUserProfileEdit(user));
	});		
};

/**
 * esegue l'aggiornamento dei dati del proprio profilo
 *
 *@param req - richiesta del client
 *@param res - risposta per il client
 */
exports.updateUserProfile = function(req, res) {

	//stampo sulla console un messaggio di aggiornamento dati
	console.log('update profile: ' + JSON.stringify(req.body));
	//chiamo updateUserProfile del retriever per effettuare l'aggiornamento dei dati del profilo
	retriever.updateUserProfile(req, function(done){
		//controllo se l'aggiornamento è andato a buon fine
		if(done)
		{
			//se l'aggiornamento è andato a buon fine allora invio uno stato HTTP 200 di successo al client
			res.send(200);
		}else{
			//se l'aggiornamento non è andato a buon fine allora invio uno stato HTTP 400 di insuccesso al client
			res.send(400);
		}
	});	
};

/**
 * richiede la lista di utenti registrati
 *
 *@param req - richiesta del client
 *@param res - risposta per il client
 */
exports.getUsersList = function(req, res) {
	//stampo sulla console un messaggio di richiesta utenti registrati
	console.log('get user list: ' + JSON.stringify(req.query));	
	
	//imposto i vari parametri con valori di default se non presenti
	var page = req.query.page || 0;
	var column = req.query.column || '_id';
	//imposto un'ordinamento di default
	var order = req.query.order || 'asc';
	//prendo il numero di document per pagina dal file di configurazione, oppure se non è presente imposto il valore 22
	var perpage = req.config.adminConfig.usersPerPage || 22;
	
	//chiamo getUserList del retriever per farmi restituire i dati profilo degli utenti
	retriever.getUsersList(column, order, page, perpage, function(users){
		//invio la lista al client dopo averla "impacchettata" con il JSonComposer
		res.send(JSonComposer.createUsersList(users.data, users.options));
	});		
};

/**
 * richiede i dati di un utente per la visualizzazione
 *
 *@param req - richiesta del client
 *@param res - risposta per il client
 */
exports.sendUser = function(req, res) {
	//stampo un messaggio sulla console per richiedere i dati utente
	console.log('getUserAdmin: ' + JSON.stringify(req.params));
	//prendo l'id dell'utente
	var user_id = req.params.user_id;
	//chiamo getUserProfile del retriever per farmi restituire i dati del profilo dell'utente
	retriever.getUserProfile(user_id, function(user){
		//invio i dati al client dopo averli "impacchettati" con il JSonComposer
		res.send(JSonComposer.createUser(user));
	});		
};

/**
 * richiede i dati di un utente per l'edit
 *
 *@param req - richiesta del client
 *@param res - risposta per il client
 */
exports.sendUserEdit = function(req, res) {
	//stampo sulla console un messaggio di modifica utente
	console.log('getUserEditAdmin: ' + JSON.stringify(req.params));
	//prendo l'id del document da modificare
	var user_id = req.params.user_id;
	//chiamo getUserProfile del retriever per farmi restituire i dati del profilo da modificare
	retriever.getUserProfile(user_id, function(user){
		//invio i dati al client
		res.send(JSonComposer.createUser(user));
	});	
};

/**
 * esegue l'update dei dati di un utente da parte dell'admin
 *
 *@param req - richiesta del client
 *@param res - risposta per il client
 */
exports.updateUser = function(req, res) {
	//stampo sulla console un messaggio di aggiornamento dati utente
	console.log('update user from admin: ' + JSON.stringify(req.body));
	//chiamo updateUser del retriever per completare l'aggiornamento dei dati del profilo
	retriever.updateUser(req, function(done){
		//controllo se l'aggiornamento di dati è andato a buon fine
		if(done)
		{
			//se l'aggiornamento di dati è andato a buon fine allora invio al client uno stato HTTP 200 di successo
			res.send(200);
		}else{
			//se l'aggiornamento di dati non è andato a buon fine allora invio al client uno stato HTTP 400 di insuccesso
			res.send(400);
		}
	});	
};

/**
 * viene rimosso un utente
 *
 *@param req - richiesta del client
 *@param res - risposta per il client
 */
exports.removeUser = function(req, res) {
	//stampo sulla console un messaggio di rimozione utente
	console.log('admin is removing an user: ' + req.params.user_id);
	//chiamo removeUser del retriever per eliminare un utente
	retriever.removeUser(req.params.user_id, function(done){
		//controllo se la rimozione è andata a buon fine
		if(done)
		{
			//se la rimozione è andata a buon fine allora invio uno stato HTTP 200 di successo al client
			res.send(200);
		}else{
			//se la rimozione non è andata a buon fine allora invio uno stato HTTP 400 di insuccesso al client
			res.send(400);
		}
	});	
};
