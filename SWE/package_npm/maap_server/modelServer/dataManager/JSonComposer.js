/** * File: JSonComposer.js * Module: maap_server::ModelServer::DataManager * Author: Alberto Garbui * Created: 04/05/14 * Version: 0.1 * Description: JSON composer... * Modification History: ============================================== * Version | Changes ============================================== * 0.1 File creation ============================================== */'use strict';exports.createCollectionsList = function(collectionsList) {	var collectionsLabels = [];	var collectionsNames = [];	for(var i=0; i<collectionsList.length; i++)	{		collectionsLabels.push(collectionsList[i].label);		collectionsNames.push(collectionsList[i].name); 	}		//carico la lista di collections su data		var json =  {};	json.labels = collectionsLabels;	json.data = collectionsNames;			var jsonString = JSON.stringify(json);		return jsonString;}exports.createCollection = function(labels,data,config) {	var dataArray = [];	for(var i=0; i<data.length; i++) {		var obj = data[i];		var dataBlock = {}						//creo un blocco dati		dataBlock._id = obj._id;				//ID del document, sempre presente		dataBlock.data = {};				for(var attributename in obj){			if(attributename != '_id')			{				console.log(attributename+": "+obj[attributename]);				dataBlock.data[attributename] = obj[attributename]; //carico l'attributo			}		}					dataArray.push(dataBlock);	}		//creo il json principale: un array di labels, data e config	var json = [];	json.push(labels);	json.push(dataArray);		console.log('JSONcomposer:');	console.log(json);		var jsonString = JSON.stringify(json);	return jsonString;};exports.createDocument = function(labels,data,config) {	//creo l'array delle etichette	var labels = [];	labels.push('Id');	labels.push('Nome squadra');	labels.push('N giocatori');		//creo l'array di data	var dataArray = {};	dataArray._id= data[0]._id;	dataArray.name= data[0].name;	dataArray.number_players= data[0].number_players;		console.log("data array:");	console.log(dataArray);	//creo il json principale: un array di labels, data e config	//come da specifiche prese con jack	var json = {};//,dataArray);	json.label=labels;	json.data=dataArray;	var jsonString = JSON.stringify(json);	console.log('composer:');	console.log(jsonString);		return jsonString;};