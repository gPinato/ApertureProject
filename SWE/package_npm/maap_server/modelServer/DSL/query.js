var provaquery=function query(model,where,select,orderbycolumn,typeorder,startskip,numberofrow,populateField,populatePath,callback){
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
	var selectPopulate={};
	selectPopulate[populateField]=1;
	model
	.find(where, select, options)
	.populate({
		path:populatePath,
		select:selectPopulate
	})
	.lean()
	.exec( function(err,result){
		if(err)
			console.log('query fallita');
		else{
			for(var i=0; i<result.length; i++)
			{
				var obj = result[i];
				var newfield = obj[populatePath][populateField];
				obj[populatePath] = newfield;
			}
			callback(result);
			
		}
	});
	
}
exports.provaquery = provaquery;