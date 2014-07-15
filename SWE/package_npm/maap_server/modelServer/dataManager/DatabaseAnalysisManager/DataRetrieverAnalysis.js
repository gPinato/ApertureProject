/**
 * File: DataRetrieverAnalysis.js
 * Module: maap_server::modelServer::dataManager::DatabaseAnalysisManager
 * Author: Alberto Garbui
 * Created: 20/05/14
 * Version: 0.1
 * Description: recupero dati dal database di analisi
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

var indexManager = require('../IndexManager/IndexManager');
var DB = require('../../database/MongooseDBAnalysis');
var collectionsList = require('../../DSL/collectionData/collectionsList.json');

//utilizzo il modulo q per la gestione delle promesse
var Q = require('q');

 /**
 * Preleva il modello relativo ad una specifica collection
 *
 *@param collection_name - nome della collection relativa al modello da cercare
 *@return modello relativo alla collection specificata, -1 se il modello non è presente.
 */
var getModel = function(collection_name) {
	
	var array = DB.model;
	
	for(var i=0; i<array.length; i++)
	{
		if(array[i].name == collection_name)
		{
			return array[i].model;
		}
	}
	return -1;
}
//for unit test
exports.getModel = getModel;

 /**
 * Preleva il modello relativo ad una specifica collection
 *
 *@param collection_name - nome della collection relativa al modello da cercare
 *@return modello relativo alla collection specificata, -1 se il modello non è presente.
 */
var getDocuments = function(model, querySettings, populate, callback){
		
	var options = {};
	var sort = {};
	
	if(querySettings.orderbycolumn != '' && querySettings.typeorder != ''){
		sort[querySettings.orderbycolumn] = querySettings.typeorder;
		options.sort = sort;
	}
	if(querySettings.numberofrow != ''){
		options.limit = querySettings.numberofrow;
	}
	if(querySettings.startskip != ''){
		options.skip = querySettings.startskip;
	}
				
	var query = model.find(querySettings.where, querySettings.select, options);
	
	console.log('query: ' + JSON.stringify(querySettings));
	console.log('options: ' + JSON.stringify(options));
	console.log('pop: ' + JSON.stringify(populate));
	
	if(populate != [])
	{
		var populatePath = [];
		var populateField = [];
		
		for(var i=0; i<populate.length; i++)
		{
			populatePath.push(populate[i].key);
			populateField.push(populate[i].field);
		}

		var selectPopulate = [];	
		for(var i=0; i<populateField.length; i++)
		{
			selectPopulate[populateField[i]]=1;
		}	
		
		for(var i=0; i<populatePath.length; i++)
		{
			query.populate({
				path: populatePath[i],
				select: selectPopulate[i]
			})
		}
	}
		
	query.lean().exec( function(err,result){
	
		if(err){console.log('query fallita' + err); callback({}); return;}
					
		//a questo punto la query ha avuto successo,
		//controllo se la query e' stata eseguita su tutti 
		if(querySettings.select == undefined)querySettings.select = {};
		
		if(Object.keys(querySettings.select).length == 0)
		{
			//se sono stati selezionati tutti i campi, ora riempio la select per scrivere la query nel db
			if(result.length > 0)
			{
				for(var key in result[0])
				{
					querySettings.select[key] = 1;			//carico le chiavi utilizzate
				}
				indexManager.addQuery(model.modelName,  	//nome della collection
									  querySettings.select	//campi select
									);
			}			
		}else{
			//se la select era definita parzialmente aggiungo la query con l'indexManager
			indexManager.addQuery(model.modelName,  	//nome della collection
								  querySettings.select	//campi select
								  );
		}

		if(result.length > 0){
		
			//console.log(result);
			//se è stato specificato il populate, sostituisco i vari populate...			
			if(populate!=[])
			{
				for(var i=0; i<result.length; i++)
				{
					var obj = result[i];
										
					//estraggo le informazioni corrette
					for(var attributename in obj)
					{
						//se un campo dati e' nullo lo sostituisco con un trattino :)
						if(obj[attributename] == undefined)
						{
							obj.attributename = '-';
							continue;
						}
						
						for(var j=0; j<populatePath.length; j++)
						{
							if(attributename == populatePath[j])
							{
								var newfield = obj[populatePath[j]][populateField[j]];
								obj[populatePath[j] + '.' + populateField[j]] = newfield;
							}
						}
					}
								
					//pulisco i campi populate complessi ora che ho estratto tutte le info
					for(var attributename in obj)
					{
						for(var j=0; j<populatePath.length; j++)
						{
							if(attributename == populatePath[j])
							{
								delete obj[populatePath[j]];
							}
						}
					}

				}
			}
			
			callback(result);
					
		}else{
			//nessun risultato
		}
	});	
}

//ritorna la lista di collections, se e' definito un campo find di ricerca, restringe il 
//risultato alle sole collections che contengono il campo find all'interno della label
exports.getCollectionsList = function(find) {
	
	if(find != undefined && find != '')
	{
		var result = [];
		for(var i=0; i<collectionsList.length; i++)
		{
			var label = (collectionsList[i].label).toLowerCase();
			find = find.toLowerCase();
			if(label.indexOf(find) != -1)
			{
				result.push(collectionsList[i]);
			}		
		}	
		collectionsList = result;
	}
	
	return collectionsList;
	
}

var getTransformationFile = function(collection_name, type, fieldName) {
	return require('../../DSL/collectionData/transformation_' + collection_name + '_' + type + '_' + fieldName + '.js');
};
//for unit test
exports.getTransformationFile = getTransformationFile;

//applica le varie trasformazioni presenti nel dsl ai vari campi dei documents nell'array di documents
var applyTransformations = function(collection_name, type, documentsArray, dslArray) {

	for(var i=0; i<dslArray.length; i++)
	{
		if(dslArray[i].transformation != null)
		{
			var fieldName = dslArray[i].name;
			var transformation = getTransformationFile(collection_name, type, fieldName).transformation;
			for(var j=0; j<documentsArray.length; j++)
			{
				var document = documentsArray[j];
				for(var attributename in document)
				{
					if(attributename == fieldName)
					{
						document[attributename] = transformation(document[attributename]);
						//se e' indefinito visualizza un trattino
						if(document[attributename] == undefined) document[attributename]= '-';
					}
				}
			}
		}	
	}
	return documentsArray;
}
//for unit test
exports.applyTransformations = applyTransformations;

var sortDocumentsByLabels = function(documents, keys) {
	var result = [];
	for(var i=0; i<documents.length; i++)
	{
		var sortedDocument = {};
		for(var j=0; j<keys.length; j++)
		{
			sortedDocument[keys[j]] = documents[i][keys[j]];
			if(sortedDocument[keys[j]] == undefined)
				sortedDocument[keys[j]] = '-';
		}
		result.push(sortedDocument);
	}	
	return result;
}

var countDocuments = function(model, where) {

	var deferred = Q.defer();

	model.count(where, function(err, count){
		if(err)
		{
			console.log('countDOcuments err: ' + err);
			deferred.resolve(0);
		}else{
			deferred.resolve(count);
		}		
	});

	return deferred.promise;
}

var findDocuments = function(query) {

	var deferred = Q.defer();

	query.lean().exec(function(err, result){
		if(err)
		{
			console.log('findDocuments err: ' + err);
			deferred.resolve([]);
		}else{
			console.log('finddd: ' + result.length + ' --> ' + JSON.stringify(result));
			deferred.resolve(result);
		}
	});

	return deferred.promise;
}

var getDocumentsForIndex = function(model, querySettings){

	//inizio la creazione della promessa
	var deferred = Q.defer();
	
	//estraggo le varie impostazioni
	var where = querySettings.where;
	var select = querySettings.select;
	var column = querySettings.column;
	var order = querySettings.order;
	var page = querySettings.page;
	var perpage = querySettings.perpage;
	var populate = querySettings.populate;
	
	console.log(querySettings);
	
	var numberOfPages = 0;
	var totDocuments = 0;
	var undefinedCount = 0;
	var definedCount = 0;
	var firstResult = [];
	
	//controllo se devo gestire il populate
	var populatePath = [];
	var populateField = [];
	
	for(var i=0; i<populate.length; i++)
	{
		populatePath.push(populate[i].key);
		populateField.push(populate[i].field);
	}

	var selectPopulate = [];	
	for(var i=0; i<populateField.length; i++)
	{
		selectPopulate[populateField[i]]=1;
	}		
	
	//conto il numero di documenti presenti nella collection
	countDocuments(model, where)
	
	.then(function(count){
		//calcolo il numero di pagine per visualizzare tutti i documenti
		console.log('conta documents totali inside: ' +  count);
		numberOfPages = Math.floor(count / perpage);
		if((count % perpage) > 0) numberOfPages++;	
		totDocuments = count;
		
		//ritorno una promessa contenente il conteggio dei documenti che non possiedono il 
		//campo da ordinare
		var whereExists = {};
		whereExists[column] = {$exists: false};
		return countDocuments(model, whereExists);
	})
	
	.then(function(count){
	
		//ora conosco quanti documenti posso ordinare e quanti non hanno il campo da ordinare
		undefinedCount = count;
		definedCount = totDocuments - undefinedCount;
		
		console.log('conta documents undefined ' + undefinedCount);
		console.log('quindi defined ' + definedCount);
		
		//preparo le opzioni per la prossima query
		var options = {
			limit: perpage,
			skip: perpage * page	
		};
		
		var sort = {};	
		if(querySettings.column != '' && querySettings.order != ''){
			sort[querySettings.column] = querySettings.order;
			options.sort = sort;
		}
	
		console.log('WHEREEEEEEEEEE1 ' + JSON.stringify(where));
		//delete where[querySettings.column];
		
		//preparo il campo where
		var whereFull = {};
		for(var key in where)
			whereFull[key] = where[key];
			
		//aggiungo la condizione per prendere solo i campi definiti
		whereFull[querySettings.column] = {$exists: true};
			
		console.log('WHEREEEEEEEEEE2 ' + JSON.stringify(where));
		console.log('WHEREEEEEEEEEE3 ' + JSON.stringify(whereFull));
		//preparo la query e ritorno come promessa l'esecuzione della stessa
		var query = model.find(whereFull, select, options)
		
		//imposto la query con il relativo populate
		for(var i=0; i<populatePath.length; i++)
		{
			query.populate({
				path: populatePath[i],
				select: selectPopulate[i]
			})
		}
		
		//restituisco la promessa
		return findDocuments(query);
		
	})
		
	.then(function(result){
		
		//result e' un array di documenti ordinati secondo un certo campo		
		//lo salvo.
		firstResult = result;
		console.log('first: ' + result.length);
				
		if(result.length < perpage && undefinedCount > 0)
		{
			console.log('first: if');
			//qui ho meno risultati di quanti potrebbero stare in una singola pagina
			//quindi aggiungo i documents con campi non definiti
			var numberOfPagesDefined = Math.floor(definedCount / perpage);
			if((definedCount % perpage) > 0) numberOfPagesDefined++;	
		
			//resetto le impostazioni della query, in particolare mi interessa
			//rimuovere l'ordinamento secondo un determinato campo
			var options = {};
			console.log('first: if2');
			
			if(page == numberOfPagesDefined - 1)
			{
				//se la pagina richiesta e' proprio quella intermedia composta da sorted documents ed
				//undefined documents
				options.limit = perpage - result.length;
				options.skip = 0;
				console.log('first: if3');
			
			}else{
			
				//altrimenti ho solo documents con campo sorted non definito
				options.limit = perpage;	
				options.skip = (perpage * page) - definedCount;
				if(options.skip < 0) options.skip = 0;
				console.log('first: if4');
			}
			
			console.log('first: if5');
			//preparo la nuova query per prelevare i documents che non contengono il campo
			//da ordinare
			var query = model.find(where, select, options);
			
			console.log('first: if6');
			
			query.exists(querySettings.column, false);

			console.log('first: ready');
			//ritorno la promessa di eseguire la suddetta query
			return findDocuments(query);
				
		}else{
			//qui ho gia' riempito la pagina con perpage risultati
			//quindi termino la promessa passando il risultato
			console.log('first: else');
			deferred.resolve(result);		
			
		}			
	})

	.then(function(emptyResult){	
		//eseguo la concatenazione dei risultati del primo risultato di documenti ordinati
		//assieme al secondo risultato di documenti con il campo da ordinare non presente
		var totResult = {};
		console.log('last STEPPPPP');
		if(order != 'desc')
		{
			console.log('ASC!!');
			totResult = firstResult.concat(emptyResult);
		}else{
			console.log('DESC!!');
			totResult = emptyResult.concat(firstResult);
		}
		deferred.resolve(totResult);
	});
		
	//ritorno la promessa al chiamante
	return deferred.promise;
				
}//end function getDocumentsForIndex

exports.getCollectionIndex = function(collection_name, column, order, page, callback) {

	var model = getModel(collection_name);
	
	try{
		//provo a vedere se la collection e' presente
		var collection = require('../../DSL/collectionData/' + collection_name + '.json').collection;
	
		var columns = collection.index.column;
		
		var labels = [];
		var select = {};
		var populate = [];
		var keys = [];
		
		if(columns != undefined)
		{
			//generazione array di labels
			for(var i=0; i<columns.length; i++){
				if(columns[i].label != null)
				{
					labels[i] = columns[i].label;
				}else{
					labels[i] = columns[i].name;
				}
				keys[i] = columns[i].name;
			}
			keys.push('_id');
		
			for(var i=0; i<columns.length; i++){
				var name = columns[i].name.split('.');
				if(name.length > 1){
					var data = {};
					data.field = name[1];
					data.key = name[0];
					populate.push(data);
				}else{
					if(name[0] == '_id')
					{
						//se il campo _id e' in lista per essere visualizzato
						//aggiorno l'etichetta
						labels[i] = '__IDLABEL2SHOW__' + labels[i];
					}
				}				
				select[name[0]] = 1; 
			}//for
			//select.null = 1;
				
		}
		
		//se la colonna non e' specificata uso le impostazioni del DSL, altrimenti uso le impostazioni
		//derivate dalla richiesta del client			
		if(column == undefined)
		{
			var sortby = collection.index.sortby;
			order = collection.index.order;
		}else{
			//controllo la colonna da ordinare, se deriva da un campo composto
			var compositeColumn = column.split('.');
			if(compositeColumn.length > 1){
				column = compositeColumn[0];
			}
		
			//setto il campo sortby
			var sortby = column;
		}
		
		var perpage = collection.index.perpage;
		
		var where;
		if(collection.index.query == null)
			where = {};
		else
			where = collection.index.query;
			
		//controllo se devo gestire il populate
		if(populate != [])
		{
			var populatePath = [];
			var populateField = [];
			
			for(var i=0; i<populate.length; i++)
			{
				populatePath.push(populate[i].key);
				populateField.push(populate[i].field);
			}

			var selectPopulate = [];	
			for(var i=0; i<populateField.length; i++)
			{
				selectPopulate[populateField[i]]=1;
			}	
		}		
			
		var result = {};
		var querySettings = {};
		
		//inizio contando tutti i documenti presenti nella collection
		countDocuments(model, where)
		
		.then(function(count){
			
			console.log('conta documents totali ' + count);
			
			//calcolo il numero di pagine totali per visualizzarli
			result.options = {};
			result.options.pages = Math.floor(count / perpage);
			if((count % perpage) > 0) result.options.pages++;
			
			//restituisco una promessa di recupero dei documenti
			querySettings.where = where;
			querySettings.select = select;
			querySettings.column = sortby;
			querySettings.order = order;
			querySettings.page = page;
			querySettings.perpage = perpage;
			querySettings.populate = populate;
			
			return getDocumentsForIndex(model, querySettings);		
		})
								
		.then(function(documents){
		
			console.log('here you go!' + documents.length);
			console.log(documents);
			
			//controllo quanti documenti ho recuperato
			if(documents.length == 0)
			{
				//se la lista e' vuota, rispondo con un oggetto vuoto
				console.log('got zero documents!');
				callback({});
			}else{
			
				//a questo punto la query ha avuto successo,
				//controllo se la query e' stata eseguita su tutti 
				if(querySettings.select == undefined)querySettings.select = {};
				
				if(Object.keys(querySettings.select).length == 0)
				{
					//se sono stati selezionati tutti i campi, ora riempio la select per scrivere la query nel db
					for(var key in documents[0])
					{
						querySettings.select[key] = 1;			//carico le chiavi utilizzate
					}
					indexManager.addQuery(model.modelName,  	//nome della collection
										  querySettings.select	//campi select
										);			
				}else{
					//se la select era definita parzialmente aggiungo la query con l'indexManager
					indexManager.addQuery(model.modelName,  	//nome della collection
										  querySettings.select	//campi select
										  );
				}

				console.log('CHECKPOPULATE');
				
				//se è stato specificato il populate, sostituisco i vari populate...			
				if(populate != [])
				{
					console.log('OKPOPULATE');
					
					for(var i=0; i<documents.length; i++)
					{
						var obj = documents[i];
											
						//estraggo le informazioni corrette
						for(var attributename in obj)
						{
							//se un campo dati e' nullo lo sostituisco con un trattino :)
							if(obj[attributename] == undefined)
							{
								obj.attributename = '-';
								continue;
							}
							
							for(var j=0; j<populatePath.length; j++)
							{
								if(attributename == populatePath[j])
								{
									var newfield = obj[populatePath[j]][populateField[j]];
									obj[populatePath[j] + '.' + populateField[j]] = newfield;
								}
							}
						}
									
						//pulisco i campi populate complessi ora che ho estratto tutte le info
						for(var attributename in obj)
						{
							for(var j=0; j<populatePath.length; j++)
							{
								if(attributename == populatePath[j])
								{
									console.log('DELETESTART');
									delete obj[populatePath[j]];
									console.log('DELETESTOP');
								}
							}
						}

					}
				}//end if populate != []
				
				console.log('OKAPPA');
				
				if(columns != undefined)
				{
					//qui columns del dsl e' definita
					result.labels = labels;	
					documents = sortDocumentsByLabels(documents, keys);
					result.documents = applyTransformations(collection_name, 'index', documents, columns);
				}else{	
					//nel caso la column non sia definita
					result.labels = [];
					if(documents.length > 0)
					{
						for(var key in documents[0])
						{
							result.labels.push(key);
						}
					}
					result.documents = documents;	//documents senza trasformazioni
				}
				
				//al termine richiamo la callback con l'oggetto result
				//contenente le etichette, i documenti ed il numero di pagine
				callback(result);						
			}
		});
			
	}catch(err){
		//se la collection non e' presente, rispondo con la lista vuota
		console.log('err: ' + err);
		callback({});
	}
}

exports.getDocumentShow = function(collection_name, document_id, callback) {

	try{
		var model = getModel(collection_name);
		var collection = require('../../DSL/collectionData/' + collection_name + '.json').collection;
		var rows = collection.show.row;
		
		//generazione array di labels
		var labels = [];
		var select = {};
		var populate = [];
		
		if(rows != undefined)
		{
			var keys = [];
			for(var i=0; i<rows.length; i++){
				if(rows[i].label != null)
				{
					labels[i] = rows[i].label;
				}else{
					labels[i] = rows[i].name;
				}
				keys[i] = rows[i].name;
			}
			keys.push('_id');
			
			for(var i=0; i<rows.length; i++){
				var name = rows[i].name.split('.');
				if(name.length > 1){
					var data = {};
					data.field = name[1];
					data.key = name[0];
					populate.push(data);
				}else{
					if(name[0] == '_id')
					{
						//se il campo _id e' in lista per essere visualizzato
						//aggiorno l'etichetta
						labels[i] = '__IDLABEL2SHOW__' + labels[i];
					}
				}	
				select[name[0]] = 1; 
			}//for
			
		}
		
		var query = {};
		query._id = document_id;
		
		var querySettings = {};
		querySettings.where = query; 
		querySettings.select = select;
		querySettings.orderbycolumn = '';
		querySettings.typeorder = '';
		querySettings.startskip = 0;
		querySettings.numberofrow = '';
		
		getDocuments(model,
					querySettings,
					populate,			//populate
					function(documents){
						var result = {};
						if(rows != undefined)
						{
							result.labels = labels;	
							documents = sortDocumentsByLabels(documents, keys);
							documents = applyTransformations(collection_name, 'show', documents, rows);
						}else{	
							//nel caso la row non sia definita
							result.labels = [];
							for(var key in documents[0])
							{
								result.labels.push(key);
							}
						}
						result.rows = documents[0];
						callback(result);
					});
	}catch(err){
		//se il document non e' presente, rispondo con la lista vuota
		console.log('err: ' + err);
		callback({});
	}
}

exports.getDocumentShowEdit = function(collection_name, document_id, callback) {

	var model = getModel(collection_name);
	
	var query = {};
	query._id = document_id;
	
	var querySettings = {};
	querySettings.where = query; 
	querySettings.select = {};
	querySettings.orderbycolumn = '';
	querySettings.typeorder = '';
	querySettings.startskip = 0;
	querySettings.numberofrow = '';
	
	//eseguo una query pulita e restituisco tutti i dati in formato json senza modifiche
	//per permettere all'utente di modificare i dati a piacimento
	getDocuments(model,
				querySettings,
				'',								//niente populate
				function(document2edit){
					callback(document2edit[0]); //restituisco il primo ed unico json dell'array
				});

}


exports.updateDocument = function(collection_name, document_id, newDocumentData, callback) {
	var model = getModel(collection_name);
	
	var criteria = {};
	criteria._id = document_id;
	var options = {};
	
	for(var key in newDocumentData)
	{
		if(key.indexOf('$') == 0) //rimuovo campi dati con il dollaro se ce ne sono (FIX temporaneo..)
			delete newDocumentData[key];
	}
	
	//se sto modificando i vari campi dati lasciando invariato l'_id
	if(newDocumentData._id == document_id)
	{
		delete newDocumentData._id; //rimuovo l'_id perchè non posso modificarlo con mongoose
	
		var query = model.update(criteria, {$set: newDocumentData}, options);
		query.lean().exec( function(err, count){
			if(err){console.log('document update fallito: ' + err); callback(false); return;}
			if(count==0){
				//console.log('nessun risultato'); 
				callback(false);
			}else{
				//update avvenuto con successo
				callback(true);
			}
		});
	
	}else{
		
		//altrimenti se l'utente vuole modificare l'id, prima rimuovo il vecchio document
		removeDocument(collection_name, document_id, function(done){
			if(done)
			{
				//ora creo un nuovo document con il nuovo id
				model.create(newDocumentData, function(err){
					if(err)
					{
						callback(false);
					}else{
						//creazione avvenuta con successo
						callback(true);
					}			
				});
				
			}else{
				callback(false);
			}		
		});
	
	}
}

 /**
 * Elimina il documento di una specifica collection
 *
 *@param collection_name - nome della collection relativa al documento da cancellare
 *@param document_id - id del documento da cancellare
 *@param callback - funzione richiamata al termine dell'esecuzione
 */
var removeDocument = function(collection_name, document_id, callback) {

	//imposto i criteri per la rimozione (l'id del documento da cancellare)
	var criteria = {};
	criteria._id = document_id;
	
	//prelevo il modello della collezione 
	var model = getModel(collection_name);
	
	//preparo la query
	var query = model.remove(criteria);
	
	//eseguo la query
	query.lean().exec( function(err, count){
		if(err){console.log('rimozione document fallita: ' + err); callback(false); return;}
		if(count == 0) {
			//console.log('niente da eliminare'); 
			callback(false);
		}else{
			//rimozione avvenuta con successo
			callback(true);			
		}
	});
	
}
exports.removeDocument = removeDocument;

//esporto le varie funzioni
exports.getModel=getModel;	
exports.sortDocumentsByLabels = sortDocumentsByLabels;
exports.getDocuments = getDocuments;
