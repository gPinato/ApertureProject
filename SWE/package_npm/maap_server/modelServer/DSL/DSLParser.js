// qui ci va una funzione che controlla se tutti i campi dati 
// del dsl sono coerenti (testo, valori numerici, funzioni javascript, etc..)
// e ritorna un file JSON

var JSparser = require('./JavascriptParser');

var dsltoken = [
	{
		"token" : "label",
		"default" : null
	},
	{
		"token" : "position",
		"default" : -1
	},
	{
		"token" : "perpage",
		"default" : 22
	},
	{
		"token" : "sortby",
		"default" : "age"
	},
	{
		"token" : "order",
		"default" : "asc"
	},
	{
		"token" : "column",
		"default" : null
	},
	{
		"token" : "transformation",
		"default" : null
	},
	{
		"token" : "function",
		"default" : null
	},
	{
		"token" : "query",
		"default" : null
	},
	{
		"token" : "row",
		"default" : null
	}
];

var addField=function(collection,field){      
		var a=collection[field];
		 if(a===undefined){
			for(var i=0;i<dsltoken.length;i++){
			if(dsltoken[i].token===field){
			collection[field]=dsltoken[i].default;
			}//if
			}//for
			return false;
		}
		else{
			return true;
		}
		
}

var checkField=function(collection,field,root){      
		try{
		 var a=collection[field];
		 if(a===undefined){
			 throw field;
		}
		return true;
		}
		catch(err){
		     console.log('Campo obbligatorio: '+field+' non trovato in '+root);
			 return false;
		}
		
}

var IntValue=function(value,field){
	try{
		if (isNaN(value)) {
			//console.log('This is not number');
			throw field;
		}
		return true;
	}
	catch(field){
		    console.log('Il valore del campo '+field+ ' non e\' un numero');
			return false;
	}	
}//end function


var parseDSL = function(DSLstring) {

 var functionbuttonindex=[];
  var transformationindex=[];
<<<<<<< HEAD
	var JSONresult = {}
	
		
				
	var collection = DSLstring.collection; 	 
	JSONresult.collection = collection;
	
=======
  var JSONresult={};
	JSONresult.collection=DSLstring.collection;
	var collection = DSLstring.collection; 
>>>>>>> 23265f001c1c3faeca7999b520d7e1852144e233
		if(checkField(collection,'index','collection'));
	    if(checkField(collection.index,'column')){
	    var column=collection.index.column;
	    for(var i=0;i<column.length;i++){
		         checkField(column[i],'name','column');
				 if(collection.index.column[i].transformation===undefined){ ;}
				else{
					transformationindex[i]=collection.index.column[i].transformation;
				 }//else
		}//for
		}
		if(checkField(collection,'position','collection')){
		
		var a=IntValue(collection.position,'position');
		//if(intvalue)
		
		}//if
		var button=collection.index.button;
		for(var i=0;i<button.length;i++){
		         checkField(button[i],'name','button');
				 functionbuttonindex[i]=collection.index.button[i].function;
		}
		if(checkField(collection.index,'perpage')){
		
		var a=IntValue(collection.index.perpage,'perpage');
		//if(intvalue)
		
		}//if
		
	//check show
	var functionbuttonshow=[];
    var transformationshow=[];
	var show=DSLstring.collection;
		if(checkField(collection,'show','collection'));
	var button=collection.show.button;
		for(var i=0;i<button.length;i++){
		         checkField(button[i],'name','button');
				 functionbuttonshow[i]=collection.show.button[i].function;
		}
	if(checkField(collection.show,'row','show')){
	    var row=collection.show.row;
	    for(var i=0;i<row.length;i++){
		         checkField(row[i],'name','column');
				 if(collection.show.row[i].transformation===undefined){;}
				 else{
				 transformationshow[i]=collection.show.row[i].transformation;
				}//else
		}//for
	}
		
	//var allfunctions=functionbuttonshow+transformationshow+functionbuttonindex+transformationindex;
	var alltransformation=[];
	alltransformation=transformationshow.concat(transformationindex);
	var allfunctions=[];
	allfunctions=functionbuttonshow.concat(functionbuttonindex);
	var all=[];
	all=alltransformation.concat(allfunctions);//functionbuttonindex;//functionbuttonshow;
	console.log('provo a controllare la correttezza della funzione javascript...');
	for(var i=0;i<all.length;i++){
	//tento il parsing del file javascript
	console.log(all[i]);
	
	try {
		var result = JSparser.parse(all[i]);
	} catch(err) {
		console.error('parsing error!');
		console.error('check your function syntax!');
		throw err; 
	}
	}//for
	
	
	addField(collection,'label');
	addField(collection,'position');
	addField(collection.index,'populate');
	addField(collection.index,'sortby');
	addField(collection.index,'order');
	addField(collection.index,'perpage');
	if(collection.index.column!=undefined){
	for(var i=0;i<collection.index.column.length;i++){
	addField(collection.index.column[i],'label');
	addField(collection.index.column[i],'transformation');
	}
	}
	addField(collection.index,'column');
	
	if(collection.index.button!=undefined){
	for(var i=0;i<collection.index.button.length;i++){
	addField(collection.index.button[i],'label');
	addField(collection.index.button[i],'function');
	}
	}
	addField(collection.index,'button');
	
	addField(collection.index,'query');

	if(collection.show.row!=undefined){
	for(var i=0;i<collection.show.row.length;i++){
	addField(collection.show.row[i],'label');
	addField(collection.show.row[i],'transformation');
	}
	}
	addField(collection.show,'row');
	
	if(collection.show.button!=undefined){
	for(var i=0;i<collection.show.button.length;i++){
	addField(collection.show.button[i],'label');
	addField(collection.show.button[i],'function');
	}
	}
	addField(collection.show,'button');

	
	
	//ritorno il JSON con tutti i campi del DSL
	return JSONresult;
}

exports.parseDSL = parseDSL;