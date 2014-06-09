var provaquery=function query(model,where,select,orderbycolumn,typeorder,startskip,numberofrow,populate,callback){
	var options = {};
	if(orderbycolumn!='' && typeorder !=''){
	var sort={};
	sort[orderbycolumn]=typeorder;
	options.sort = sort;
	}
	if(numberofrow!=''){
	options.limit = numberofrow;
	}
	if(startskip!=''){
	options.skip = startskip;
	}
		
	var query = model.find(where, select, options);
	
	if(populate != [])
	{
		var populatePath = [];
		var populateField = [];
		
		for(var i=0; i< populate.length; i++)
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
		if(err){console.log('query fallita'); return;}
		if(!result){
		console.log('nessun risultato') 
		}else{
			//se è stato specificato il populate, sostituisco i vari populate...
			if(populate!=[])
			{
				for(var i=0; i<result.length; i++)
				{
					var obj = result[i];
					for(var attributename in obj)
					{
						for(var j=0; j<populatePath.length; j++)
						{
							if(attributename == populatePath[j])
							{
								var newfield = obj[populatePath[j]][populateField[j]];
								obj[populatePath[j]] = newfield;
							}
						}
					}
				}
			}
			callback(result);
			
		}
	});
	
}
exports.provaquery = provaquery;