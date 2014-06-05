var provaquery=function query(model,where,select,orderbycolumn,typeorder,startskip,numberofrow,callback){
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
	model.find(where, select, options, function(err,result){
		if(err)
			console.log('query fallita');
		else{
				callback(result);
		}
	});
	
}
exports.provaquery = provaquery;