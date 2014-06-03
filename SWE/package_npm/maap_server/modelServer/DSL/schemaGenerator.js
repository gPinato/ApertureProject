/**
 * File: DSLManager.js
 * Module: maap_server::modelServer::DSL
 * Author: Alberto Garbui
 * Created: 01/06/14
 * Version: 0.1
 * Description: gestione file dsl
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

//qui per lo stesso file viene generato lo schema per mongoose
			
/* ESEMPIO DI SCHEMA:
var mongoose = require('mongoose');
exports.schema = new mongoose.Schema({
	email: { 
			type: String, 
	},
	password: {
		type: String
	}
});
*/

exports.generate = function(dslJson) {
	
	var collection = dslJson.collection;
	
	var schema = '//maaperture auto-generated mongoose schema:\n\n';
	schema += 'var mongoose = require(\'mongoose\');\n\n';
		
	var indexColumns = collection.index.column;
	
	if(indexColumns != undefined)
	{
		schema += 'exports.indexSchema = new mongoose.Schema({\n';
		for(var i=0; i<indexColumns.length; i++)
		{
			if(i != 0){schema += ',\n';}
			var key = indexColumns[i].name;
			var type = indexColumns[i].type;
			schema += key + ': { type: ' + type + ' }';
		}
		schema += '\n});\n\n';
	}
	
	
	var showRows = collection.show.row;
	
	if(showRows != undefined)
	{
		schema += 'exports.showSchema = new mongoose.Schema({\n';
		for(var i=0; i<showRows.length; i++)
		{
			if(i != 0){schema += ',\n';}
			var key = showRows[i].name;
			var type = showRows[i].type;
			schema += key + ': { type: ' + type + ' }';
		}
		schema += '\n});\n\n';
	}

	return schema;
}