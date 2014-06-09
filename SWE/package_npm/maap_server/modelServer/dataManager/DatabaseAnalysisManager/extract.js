
	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost:27017/dati');
	var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function callback () {
		});
	var schema = require('../../DSL/schemaprova.js');
	var teamsSchema = schema.teamsSchema;
	var teamsModel = db.model('teams', teamsSchema);
	var coachesSchema = schema.coachesSchema;
	var coachesModel = db.model('coaches', coachesSchema);
	
	var populateFields=[];
	
	var testquery = require('../../DSL/query');
	
var extractPopulate=function(populateArray, key){
	for(var i=0;i<populateArray.length;i++){
		if(populateArray[i].key === key){
			return getModel(populateArray[i].collection);
		}
	}
	return '';
}


var getModel = function(collection_name) {
	var array = [];
	array.push(teamsModel);
	return coachesModel;
}



var extractfield = function extract(namecollection){

	var collection = require('../../DSL/collectionData/'+namecollection+'.json').collection;
	var columns = collection.index.column;
	var labelcolumns=[];
	for(var i = 0; i<columns.length;i++){
		labelcolumns[i]=columns[i].label;
	}//for
	
	var fieldsquery = {};
	
	for(var i=0; i<columns.length;i++){
	     var name=columns[i].name.split('.');
	    if(name.length>1){
			var data={};
			data.model=extractPopulate(collection.index.populate,name[0]);
			data.field=name[1];
			data.key=name[0];
			populateFields.push(data);
		}
		
		else{
		  
		}
		fieldsquery[name[0]]=1; 
	}//for
	
	var sortby = collection.index.sortby;
	var order = collection.index.order;
	var perpage = collection.index.perpage;
	var query;
	if(collection.index.query===null)
		query = {};
	else
		query = collection.index.query;
	//console.log('name: '+namecollection);
	
	testquery.provaquery(teamsModel,
					query, 										//where
					fieldsquery,								 //select 
					sortby, 								//colonna da ordinare
					order,											//tipo ordinamento
					0,												//partenza
					perpage,
					'name',
						'coach',//numero elementi
					function(dati){
						
						/*var result = {}						
						result.label = labelcolumns;
						result.dati = dati;
						//aggiungo l'id del campo
						for(var j=0; j<populateFields.length; j++)
						{
							var array=[];
							for(var k=0; k<dati.length; k++)
							{
								var document = dati[k];
								
								array[k]=document[populateFields[j].key];
								console.log('Array['+k+'] '+array[k]);
							}
							console.log("Array "+array);
							populateFields[j].id =array;
						}*/
						console.log('dati grezzi:');
						console.log(dati);						
						/*result = populateQuery(result);						
						/*console.log('dati aggiornati:');
						console.log(result);*/
						
					});
}//end function

var populateQuery = function(dati) {
   
	var result = dati.dati;
	var result3 = {coach: 'ciao'};
	var populateQueryResult = [];
	
	
		for(var i=0;i<populateFields.length;i++){
		    var key=populateFields[i].key;
			var field=populateFields[i].field;
			for(var k=0; k<populateFields[i].id.length; k++){
				var select={};
				select[populateFields[0].field]=1;
				//console.log(populateFields[i].model);
				testquery.provaquery(populateFields[i].model,
									{_id : populateFields[i].id[k] },
									select,
									'',
									'',
									0,
									5,
									function(data){
										console.log('data intermedio');
									    
										populateQueryResult.push(data);
										for(var z=0;z<result.length;z++){
										        // var resultZ=result[z];
										    for(var y=0;y<data.length;y++){
											    
											    // var dataY=data[y];
												if(result[z][key]==data[y].id){
												   
													 console.log(result[z][key]);
													 console.log(data[y][field]);
													result[z][key]=data[y][field];
													result3[key] = data[y][field];
													console.log('re ' +result[z][key]);
													console.log('re3 ' +result3[key]);
													
													
												}
											}
										}
											console.log(result);
									}
									);													
									
			}
	}
	
	//while(populateQueryResult.length != populateFields.length);
	/*console.log('nomi');
	console.log(populateQueryResult);*/
	
	/*for(var i=0;i<populateFields.length;i++)
	{
		var field=populateFields[i].key;
		//if(result.dati[j].field.===
	}
								
	dati.dati = result;*/
	return dati;

}

exports.extractfield = extractfield;