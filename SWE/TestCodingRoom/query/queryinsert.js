var provaquery = function query(model, criteria,callback){
	var options = {};
	//options. = true;
	
	//var query = model.create(criteria);
	var query = criteria.save(function(err){
		if(err)
			console.log('errore');
		else
			console.log('ok');
	/*query.lean().exec( function(err){
		if(err){console.log('query inserimento fallita'); return;}
		//if(count==0){
		//console.log('nessun risultato'); 
		//console.log('count:'+count);
		else{
			console.log('query inserimento ok');
			/*var result = model.find(criteria);
			result.lean().exec( function(err, ris){
				if(err){console.log('query find utenti fallita'); return;}
				if(!ris){
					console.log('nessun risultato');
				}
				else{
					//callback(ris);
				//}
			//});
		}//else*/
		});
}
exports.provaquery = provaquery;