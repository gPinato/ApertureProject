/** * File: MongooseDBFramework.js * Module: maap_server::modelServer::database * Author: Alberto Garbui * Created: 08/05/14 * Version: 0.1 * Description: gestione db  * Modification History: ============================================== * Version | Changes ============================================== * 0.1 File creation ============================================== */'use strict';var mongoose = require('mongoose');var LocalUserSchema = new mongoose.Schema({	email: { 			type: String, 			required: true	},	password: {		type: String,		required: true	},	level: {		type: Number, min: 0, max: 1,		required: true	}});var QuerySchema = new mongoose.Schema({	collection_name: {		type: String, 		required: true	},	select: {		type: {}, 		required: true	},	counter: {		type: Number, min: 0, default: 0	}	});exports.init = function(app) {		var config = app.config;	var db = app.db.users;	var usersCollection = app.config.userDB.usersCollection;	var queryCollection = app.config.userDB.queryCollection;			//definisco i modelli	var users = db.model(usersCollection, LocalUserSchema);			exports.query = db.model(queryCollection, QuerySchema);	exports.users = users;	}