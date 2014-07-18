collection = {
	label: 'Aperture Team',
	name: 'members',
	position: 2,
	
	index : {
		perpage: 10,
		sortby: 'age',
		order: 'desc',
		column : [
			{
				label: 'Nome',
				name: 'name',
				type: 'String'
			},
			{	
				label: 'Cognome',
				name: 'surname',
				type: 'String'
			},
			{
				label: 'Età',
				name: 'age',
				type: 'Number'
			},
			{	
				label: 'email',
				name: 'email',
				type: 'String'
			}
		],
		query: {
			age: {$lt: 30}
		}
	}, //end index page
	
	show : {
		row : [
			{
				label: 'Nome',
				name: 'name',
				type: 'String'
			},
			{	
				label: 'Cognome',
				name: 'surname',
				type: 'String'
			},
			{	
				label: 'email',
				name: 'email',
				type: 'String'
			},
			{	
				label: 'eta',
				name: 'age',
				type: 'Number, min: 18, max:35'
			},
			{	
				label: 'Interessi',
				name: 'interest',
				type: 'Array',
				transformation: 'var result = \"\" ; \
								for(var i=0; i<interest.length; i++) \
								{ \
									if(i != 0){result += \" -> \"; } \
									result += interest[i]; \
								} \
								interest = result;'							
			}
		]
	} //end show page
	
} //end collection	

//exports collection [DO NOT REMOVE]
exports.collection = collection;
