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