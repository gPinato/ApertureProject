/**
 * File: schemaGenerator.js
 * Module: maap_server::modelServer::DSL
 * Author: Alberto Garbui
 * Created: 01/06/14
 * Version: 0.1
 * Description: generatore di schemi per mongoose
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

var getPopulatedCollection = function(populateArray, key) {

	for(var i=0; i<populateArray.length; i++) 
	{
		if(populateArray[i].key == key)
			return populateArray[i].collection;
	}
	return '';
}

var arrayAddElement = function(element, array) {
	var trovato = false;
	for(var i=0; i<array.length; i++)
	{
		if(array[i].key == element.key)
			trovato = true;
	}
	if(!trovato)
	{
		array.push(element);
	}
	return array;
}

exports.generate = function(dslJson) {
	
	var collection = dslJson.collection;
	
	//creo un array con coppie chiave/valore , scorro il DSL per trovare tutti i campi necessari
	var schemaElements = [];
	
	var indexColumns = collection.index.column;
		
	if(indexColumns != undefined)
	{
		
		for(var i=0; i<indexColumns.length; i++)
		{
			var name = indexColumns[i].name.split('.');
			var type = indexColumns[i].type;
			
			if(name.length > 1 && collection.index.populate != undefined)	//nome composto con populate
			{
				var ref = collection.index.populate;
				type = 'ObjectId, ref: \'coaches\'';	
				
				//ora però devo aggiungere/creare lo schema del nome composto
				var composed_name = name[1];
				var composed_type = indexColumns[i].type;
				var composed_collection = getPopulatedCollection(collection.index.populate, name[0]);
				
				//controllo se è gia presente un file schema per quella collection
				/*var composed_schema = require('./collectionData/' + composed_collection + '_schema.js');
				if(composed_schema != undefined)
				{
					//lo schema è già stato definito, quindi controllo e nel caso aggiungo 
					//l'elemento mancante
					
				}else{
					//lo schema NON è stato definito, quindi lo creo exnovo
					
				}*/
			}	
			
			schemaElements = arrayAddElement({key: name[0], value: type}, schemaElements);
			
		}//end for indexColumns
	}
	
	
	var showRows = collection.show.row;
	
	if(showRows != undefined)
	{
		
		for(var i=0; i<showRows.length; i++)
		{
			var name = showRows[i].name.split('.');
			var type = showRows[i].type;
			
			if(name.length > 1 &&  collection.show.populate != undefined)	//nome composto con populate
			{
				type = 'ObjectId';	
				
				//ora però devo aggiungere/creare lo schema del nome composto
				var composed_name = name[1];
				var composed_type = showRows[i].type;
				var composed_collection = getPopulatedCollection(collection.show.populate, name[0]);
				
				//controllo se è gia presente un file schema per quella collection
				/*var composed_schema = require('./collectionData/' + composed_collection + '_schema.js');
				if(composed_schema != undefined)
				{
					//lo schema è già stato definito, quindi controllo e nel caso aggiungo 
					//l'elemento mancante
					
				}else{
					//lo schema NON è stato definito, quindi lo creo exnovo
					
				}*/
			}	
			
			schemaElements = arrayAddElement({key: name[0], value: type}, schemaElements);
			
		}//end for showRows
	}
	
	//ora che schemaElements e' completo genero lo schema
	var schema = '//maaperture auto-generated mongoose schema:\n\n';
	schema += 'var mongoose = require(\'mongoose\');\n';	
	schema += 'var ObjectId = mongoose.Schema.ObjectId;\n\n';
	schema += 'exports.schema = new mongoose.Schema({\n';
	for(var i=0; i<schemaElements.length; i++)
	{
		if(i != 0){schema += ',\n';}
		var key = schemaElements[i].key;
		var type = schemaElements[i].value;
		schema += key + ': { type: ' + type + ' }';
	}
	schema += '\n});\n\n';
	
	return schema;
}