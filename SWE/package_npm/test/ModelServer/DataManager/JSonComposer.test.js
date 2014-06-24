/** * File: JSonComposer.test.js * Module: test::ModelServer::DataManager * Author: Michele Maso  * Created: 20/06/14 * Version: 1.0 * Description: test del JSonComposer  * Modification History: ============================================== * Version | Changes ============================================== * 1.0 File creation ============================================== */var chai = require('chai');var should = chai.should();var assert = chai.assert;var expect = chai.expect;describe("Test createCollectionList:", function() {	var createCollectionsList = require("../../../maap_server/modelServer/dataManager/JSonComposer.js").createCollectionsList;	var collection = new Array();	collection.push({label:'a', name:'aa', position:1});	collection.push({label:'b', name:'bb', position:2});	collection.push({label:'c',name:'cc', position:3});	var collectionReturn = createCollectionsList(collection);	var collectionJSON = JSON.parse(collectionReturn);    it("collection deve avere il campo labels", function() {		expect(collectionJSON).to.have.property('labels');    }),	it("collection deve avere il campo data", function() {		expect(collectionJSON).to.have.property('data');	}),		it("collection deve avere positions", function() {		expect(collectionJSON).to.have.property('positions');	});		it("valore 0 del campo labels errato", function() {		expect(collectionJSON.labels[0]).to.equal(collection[0].label);	});		it("valore 1 del campo labes sbagliato", function() {		expect(collectionJSON.labels[1]).to.equal(collection[1].label);	});		it("valore 2 del campo labels sbagliato", function() {		expect(collectionJSON.labels[2]).to.equal(collection[2].label);	});		it("valore 0 del campo name errato", function() {		expect(collectionJSON.data[0]).to.equal(collection[0].name);	});		it("valore 1 del campo name sbagliato", function() {		expect(collectionJSON.data[1]).to.equal(collection[1].name);	});		it("valore 2 del campo name sbagliato", function() {		expect(collectionJSON.data[2]).to.equal(collection[2].name);	});		it("valore 0 del campo positionserrato", function() {		expect(collectionJSON.positions[0]).to.equal(collection[0].position);	});		it("valore 1 del campo positions sbagliato", function() {		expect(collectionJSON.positions[1]).to.equal(collection[1].position);	});		it("valore 2 del campo positions sbagliato", function() {		expect(collectionJSON.positions[2]).to.equal(collection[2].position);	});	}); describe("Test checkLabels:", function() {	var checkLabels = require("../../../maap_server/modelServer/dataManager/JSonComposer.js").checkLabels;	var labelsArray=[];	labelsArray.push('__IDLABEL2SHOW__');	labelsArray.push('age');	labelsArray.push('name');	labelsArray.push('surname');			it("L'array NON contiene un etichetta che inizia con __IDLABEL2SHOW__ o _id", function() {		var check=checkLabels(labelsArray);		expect(check).equal(true);	});				it("L'array NON contiene un etichetta che inizia con __IDLABEL2SHOW__ o _id", function() {		labelsArray[0]='_id';		var check=checkLabels(labelsArray);		expect(check).equal(true);	});		it("L'array contiene un etichetta che inizia con __IDLABEL2SHOW__ o _id", function() {		labelsArray[0]='id';		var check=checkLabels(labelsArray);		expect(check).equal(false);	});		it("L'array contiene un etichetta che inizia con __IDLABEL2SHOW__ o _id", function() {		labelsArray[2]='prova__IDLABEL2SHOW__';		var check4=checkLabels(labelsArray);		expect(check4).equal(false);	});		it("L'array contiene un etichetta che inizia con __IDLABEL2SHOW__ o _id", function() {		labelsArray[0]='_id';		var check5=checkLabels(labelsArray);		expect(check5).equal(true);	});		});describe("Test createCollection:", function() {	var createCollection=require("../../../maap_server/modelServer/dataManager/JSonComposer.js").createCollection;	var labels=['name','surname'];	var data=new Array();	data.push({_id:'a1',name:'b1',surname:'c1'});	data.push({_id:'a2',name:'b2',surname:'c2'});	data.push({_id:'a3',name:'b3',surname:'c3'});	var config={pages:2};	var createCollectionReturn=createCollection(labels,data,config);	var collectionJSON=JSON.parse(createCollectionReturn);	it("I valori, dell'array alla posizione 0, sono errati", function() {		expect(collectionJSON[0][0]).equal(labels[0]);		expect(collectionJSON[0][1]).equal(labels[1]);			});	it("Uno o più campi assenti negli oggetti dell'array alla posizione 1, nel caso in cui _id NON sia presente tra le labels", function() {		expect(collectionJSON[1][0]).to.have.property('_id');		expect(collectionJSON[1][0]).to.have.property('data');		expect(collectionJSON[1][0].data).to.have.property('name');		expect(collectionJSON[1][0].data).to.have.property('surname');		expect(collectionJSON[1][1]).to.have.property('_id');		expect(collectionJSON[1][1]).to.have.property('data');		expect(collectionJSON[1][1].data).to.have.property('name');		expect(collectionJSON[1][1].data).to.have.property('surname');		expect(collectionJSON[1][2]).to.have.property('_id');		expect(collectionJSON[1][2]).to.have.property('data');		expect(collectionJSON[1][2].data).to.have.property('name');		expect(collectionJSON[1][2].data).to.have.property('surname');	});		it("I valori, dell'array alla posizione 1 dentro il campo data, sono errati.  Caso in cui _id NON è presente tra le labels.", function() {		expect(collectionJSON[1][0].data.name).equal(data[0].name);		expect(collectionJSON[1][0].data.surname).equal(data[0].surname);		expect(collectionJSON[1][1].data.name).equal(data[1].name);		expect(collectionJSON[1][1].data.surname).equal(data[1].surname);		expect(collectionJSON[1][2].data.name).equal(data[2].name);		expect(collectionJSON[1][2].data.surname).equal(data[2].surname);			});		it("Uno o più campi assenti negli oggetti dell'array alla posizione 2, nel caso in cui _id NON sia presente tra le labels", function() {		expect(collectionJSON[2]).to.have.property('pages');	});		it("Il valore di page è errato.  Caso in cui _id NON è presente tra le labels.", function() {		expect(collectionJSON[2].pages).equal(2);	});			it("Uno o più campi assenti negli oggetti dell'array alla posizione 1.  Caso in cui _id sia tra le labels", function() {		var labels=['_id','name','surname'];		var createCollectionReturn=createCollection(labels,data,config);		var collectionJSON=JSON.parse(createCollectionReturn);		expect(collectionJSON[1][0]).to.have.property('_id');		expect(collectionJSON[1][0]).to.have.property('data');		expect(collectionJSON[1][0].data).to.have.property('_id');		expect(collectionJSON[1][0].data).to.have.property('name');		expect(collectionJSON[1][0].data).to.have.property('surname');		expect(collectionJSON[1][1]).to.have.property('_id');		expect(collectionJSON[1][1]).to.have.property('data');		expect(collectionJSON[1][1].data).to.have.property('_id');		expect(collectionJSON[1][1].data).to.have.property('name');		expect(collectionJSON[1][1].data).to.have.property('surname');		expect(collectionJSON[1][2]).to.have.property('_id');		expect(collectionJSON[1][2]).to.have.property('data');		expect(collectionJSON[1][2].data).to.have.property('_id');		expect(collectionJSON[1][2].data).to.have.property('name');		expect(collectionJSON[1][2].data).to.have.property('surname');	});		it("I valori, dell'array alla posizione 1 dentro il campo data, sono errati.  Caso in cui _id sia tra le labels.", function() {		var labels=['_id','name','surname'];		var createCollectionReturn=createCollection(labels,data,config);		var collectionJSON=JSON.parse(createCollectionReturn);		expect(collectionJSON[1][0].data._id).equal(data[0]._id);		expect(collectionJSON[1][0].data.name).equal(data[0].name);		expect(collectionJSON[1][0].data.surname).equal(data[0].surname);		expect(collectionJSON[1][1].data._id).equal(data[1]._id);		expect(collectionJSON[1][1].data.name).equal(data[1].name);		expect(collectionJSON[1][1].data.surname).equal(data[1].surname);		expect(collectionJSON[1][2].data._id).equal(data[2]._id);		expect(collectionJSON[1][2].data.name).equal(data[2].name);		expect(collectionJSON[1][2].data.surname).equal(data[2].surname);			});		it("Uno o più campi assenti negli oggetti dell'array alla posizione 2, nel Caso in cui _id sia tra le labels.", function() {		expect(collectionJSON[2]).to.have.property('pages');	});		it("Il valore di page è errato.   Caso in cui _id sia tra le labels.", function() {		expect(collectionJSON[2].pages).equal(2);	});			it("Uno o più campi assenti negli oggetti dell'array alla posizione 1, sono errati. Caso in cui _id sia tra le labels", function() {		var labels=['__IDLABEL2SHOW__iddi','name','surname'];		var createCollectionReturn=createCollection(labels,data,config);		var collectionJSON=JSON.parse(createCollectionReturn);		expect(collectionJSON[1][0]).to.have.property('_id');		expect(collectionJSON[1][0]).to.have.property('data');		expect(collectionJSON[1][0].data).to.have.property('_id');		expect(collectionJSON[1][0].data).to.have.property('name');		expect(collectionJSON[1][0].data).to.have.property('surname');		expect(collectionJSON[1][1]).to.have.property('_id');		expect(collectionJSON[1][1]).to.have.property('data');		expect(collectionJSON[1][1].data).to.have.property('_id');		expect(collectionJSON[1][1].data).to.have.property('name');		expect(collectionJSON[1][1].data).to.have.property('surname');		expect(collectionJSON[1][2]).to.have.property('_id');		expect(collectionJSON[1][2]).to.have.property('data');		expect(collectionJSON[1][2].data).to.have.property('_id');		expect(collectionJSON[1][2].data).to.have.property('name');		expect(collectionJSON[1][2].data).to.have.property('surname');	});			it("I valori delle stringhe ripulite, dell'array alla posizione 0 , sono errati.  Caso in cui _id sia tra le labels.", function() {		var labels=['__IDLABEL2SHOW__iddi','name','surname'];		var createCollectionReturn=createCollection(labels,data,config);		var collectionJSON=JSON.parse(createCollectionReturn);		expect(collectionJSON[0][0]).equal('iddi');	});		it("I valori, dell'array alla posizione 1 dentro il campo data, sono errati.  Caso in cui _id sia tra le labels.", function() {		var labels=['__IDLABEL2SHOW__iddi','name','surname'];		var createCollectionReturn=createCollection(labels,data,config);		var collectionJSON=JSON.parse(createCollectionReturn);		expect(collectionJSON[1][0].data._id).equal(data[0]._id);		expect(collectionJSON[1][0].data.name).equal(data[0].name);		expect(collectionJSON[1][0].data.surname).equal(data[0].surname);		expect(collectionJSON[1][1].data._id).equal(data[1]._id);		expect(collectionJSON[1][1].data.name).equal(data[1].name);		expect(collectionJSON[1][1].data.surname).equal(data[1].surname);		expect(collectionJSON[1][2].data._id).equal(data[2]._id);		expect(collectionJSON[1][2].data.name).equal(data[2].name);		expect(collectionJSON[1][2].data.surname).equal(data[2].surname);			});		it("Campo pages assente  nell' oggetto dell'array alla posizione 2. Caso in cui _id sia tra le labels e le labels vengono pulite.", function() {		var labels=['__IDLABEL2SHOW__iddi','name','surname'];		var createCollectionReturn=createCollection(labels,data,config);		var collectionJSON=JSON.parse(createCollectionReturn);		expect(collectionJSON[2]).to.have.property('pages');	});		it("Il valore di page è errato.   Caso in cui _id sia tra le labels e le labels vengono pulite.", function() {		var labels=['__IDLABEL2SHOW__iddi','name','surname'];		var createCollectionReturn=createCollection(labels,data,config);		var collectionJSON=JSON.parse(createCollectionReturn);		expect(collectionJSON[2].pages).equal(2);	});	});describe("Test createDocument:", function() {	var labels=['_id','name','surname'];	var data={_id:'a1',name:'b1',surname:'c1'};	var createDocument=require("../../../maap_server/modelServer/dataManager/JSonComposer.js").createDocument;	var createDocumentReturn=createDocument(labels,data);	var documentJSON=JSON.parse(createDocumentReturn);	it("Il campi labels o data non sono definiti. Caso in cui _id è presente tra le labels.", function() {		expect(documentJSON).to.have.property('label');		expect(documentJSON).to.have.property('data');		expect(documentJSON.data).to.have.property('_id');		expect(documentJSON.data).to.have.property('name');		expect(documentJSON.data).to.have.property('surname');	});		it("I valori dei campi label o data non esatti. Caso in cui _id è presente tra le labels.", function() {		expect(documentJSON.label[0]).equal(labels[0]);		expect(documentJSON.label[1]).equal(labels[1]);		expect(documentJSON.label[2]).equal(labels[2]);		expect(documentJSON.data._id).equal(data._id);		expect(documentJSON.data.name).equal(data.name);		expect(documentJSON.data.surname).equal(data.surname);	});			it("Il campi labels o data non sono definiti. Caso in cui _id NON è presente tra le labels.", function() {		var labels=['__IDLABEL2SHOW__iddi','name','surname'];		var createDocumentReturn=createDocument(labels,data);		var documentJSON=JSON.parse(createDocumentReturn);		expect(documentJSON).to.have.property('label');		expect(documentJSON).to.have.property('data');		expect(documentJSON.data).to.have.property('_id');		expect(documentJSON.data).to.have.property('name');		expect(documentJSON.data).to.have.property('surname');	});		it("I valori delle stringhe ripulite campi label o data non esatti. Caso in cui _id NON è presente tra le labels.", function() {		var labels=['__IDLABEL2SHOW__iddi','name','surname'];		var createDocumentReturn=createDocument(labels,data);		var documentJSON=JSON.parse(createDocumentReturn);		expect(documentJSON.label[0]).equal('iddi');		expect(documentJSON.label[1]).equal(labels[1]);		expect(documentJSON.label[2]).equal(labels[2]);		expect(documentJSON.data._id).equal(data._id);		expect(documentJSON.data.name).equal(data.name);		expect(documentJSON.data.surname).equal(data.surname);	});	});describe("Test createQueriesList:", function() {	var createQueriesList=require("../../../maap_server/modelServer/dataManager/JSonComposer.js").createQueriesList;	var queries=new Array();	queries.push({_id:'aa', collection_name:'a',select:{name:1, surname:1, age:1}});	var config={pages:2};	var createQueriesListReturn=createQueriesList(queries,config);	var createQueriesListJSON=JSON.parse(createQueriesListReturn);		it("Campo pages assente  nell' oggetto dell'array alla posizione 2.", function() {		expect(createQueriesListJSON[2]).to.have.property('pages');	});		it("Il valore di page è errato.", function() {		expect(createQueriesListJSON[2].pages).equal(2);	});		it("Uno o più valori, dell'array alla posizione 1, errati.", function() {		expect(createQueriesListJSON[0][0]).equal('Collection Name');		expect(createQueriesListJSON[0][1]).equal('Selected fields');	});		it("Uno o più campi, dell'oggetto dell'array alla posizione 1, errati.", function() {		expect(createQueriesListJSON[1][0]).to.have.property('_id');		expect(createQueriesListJSON[1][0]).to.have.property('data');		expect(createQueriesListJSON[1][0].data).to.have.property('name');		expect(createQueriesListJSON[1][0].data).to.have.property('fields');	});		it("Uno o più valori, dei campi dell'oggetto dell'array alla posizione 1, errati.", function() {		expect(createQueriesListJSON[1][0]._id).equal(queries[0]._id);		expect(createQueriesListJSON[1][0].data.name).equal(queries[0].collection_name);		expect(createQueriesListJSON[1][0].data.fields).equal('name, surname, age, ');	});	});	/*	describe("Test createQueriesList:", function() {		var createQueriesList=require("../../../maap_server/modelServer/dataManager/JSonComposer.js").createIndexesList;		var indexes=new Array();		indexes.push();		var createIndexesListReturn=createIndexesList(indexes);		var createIndexesListJSON=JSON.parse(createIndexesListReturn);	});*/		describe("Test createUserProfile:", function() {		var createUserProfile=require("../../../maap_server/modelServer/dataManager/JSonComposer.js").createUserProfile;		var user={_id:'aa',email:'aa@jk.com', password:'pass', level:1}		var createUserProfileReturn=createUserProfile(user);		var createUserProfileJSON=JSON.parse(createUserProfileReturn);				it("I campi label, data o interni ad essi non sono definiti. Caso utente admin.", function() {			expect(createUserProfileJSON).to.have.property('label');			expect(createUserProfileJSON).to.have.property('data');			expect(createUserProfileJSON.data).to.have.property('email');			expect(createUserProfileJSON.data).to.have.property('level');		});				it("I valori dell'array label sono errati. Caso utente admin.", function() {			expect(createUserProfileJSON.label[0]).equal("Email");			expect(createUserProfileJSON.label[1]).equal("Level");		});				it("I valori dell'oggetto data sono errati. Caso utente admin.", function() {			expect(createUserProfileJSON.data.email).equal(user.email);			expect(createUserProfileJSON.data.level).equal('administrator');		});				it("I campi label, data o ineterni ad essi non sono definiti. Caso utente user.", function() {			var user={_id:'aa',email:'aa@jk.com', password:'pass', level:0}			var createUserProfileReturn=createUserProfile(user);			var createUserProfileJSON=JSON.parse(createUserProfileReturn);			expect(createUserProfileJSON).to.have.property('label');			expect(createUserProfileJSON).to.have.property('data');			expect(createUserProfileJSON.data).to.have.property('email');			expect(createUserProfileJSON.data).to.have.property('level');		});				it("I valori dell'array label sono errati. Caso utente user.", function() {			var user={_id:'aa',email:'aa@jk.com', password:'pass', level:0}			var createUserProfileReturn=createUserProfile(user);			var createUserProfileJSON=JSON.parse(createUserProfileReturn);			expect(createUserProfileJSON.label[0]).equal("Email");			expect(createUserProfileJSON.label[1]).equal("Level");		});				it("I valori dell'oggetto data sono errati. Caso utente user.", function() {			var user={_id:'aa',email:'aa@jk.com', password:'pass', level:0}			var createUserProfileReturn=createUserProfile(user);			var createUserProfileJSON=JSON.parse(createUserProfileReturn);			expect(createUserProfileJSON.data.email).equal(user.email);			expect(createUserProfileJSON.data.level).equal('user');		});	});			describe("Test createUserProfile:", function() {		var createUserProfileEdit=require("../../../maap_server/modelServer/dataManager/JSonComposer.js").createUserProfileEdit;		var user={_id:'aa',email:'aa@jk.com', password:'pass', level:1}		var createUserProfileEditReturn=createUserProfileEdit(user);		var createUserProfileEditJSON=JSON.parse(createUserProfileEditReturn);				it("I campi label,data o interni ad essi non sono definiti.", function() {			expect(createUserProfileEditJSON).to.have.property('label');			expect(createUserProfileEditJSON).to.have.property('data');			expect(createUserProfileEditJSON.data).to.have.property('email');		});				it("I valori dell'etichetta o del campo mail sono errati.", function() {			expect(createUserProfileEditJSON.label[0]).equal('Email');			expect(createUserProfileEditJSON.data.email).equal(user.email);		});			});		describe("Test createUserList:", function() {		var createUsersList=require("../../../maap_server/modelServer/dataManager/JSonComposer.js").createUsersList;		var users=new Array();		users.push({_id:'aa',email:'aa@jk.com', password:'pass', level:0});		var config={pages:2};		var createUsersListReturn=createUsersList(users,config);		var createUsersListJSON=JSON.parse(createUsersListReturn);				it("Campo pages assente  nell' oggetto dell'array alla posizione 2. Caso Utente user.", function() {			expect(createUsersListJSON[2]).to.have.property('pages');		});			it("Il valore di page è errato.", function() {			expect(createUsersListJSON[2].pages).equal(2);		});				it("I campi labels,data o inetrni ad essi non sono definiti. Caso Utente user.", function() {			expect(createUsersListJSON[1][0]).to.have.property('_id');			expect(createUsersListJSON[1][0]).to.have.property('data');			expect(createUsersListJSON[1][0].data).to.have.property('_id');			expect(createUsersListJSON[1][0].data).to.have.property('email');			expect(createUsersListJSON[1][0].data).to.have.property('level');				});				it("I valori dell'etichetta sono errati. Caso Utente user.", function() {			expect(createUsersListJSON[0][0]).equal('ID');			expect(createUsersListJSON[0][1]).equal('Email');			expect(createUsersListJSON[0][2]).equal('Level');			expect(createUsersListJSON[1][0].data._id).equal(users[0]._id);			expect(createUsersListJSON[1][0].data.email).equal(users[0].email);			expect(createUsersListJSON[1][0].data.level).equal('user');		});				it("Campo pages assente  nell' oggetto dell'array alla posizione 2. Caso Utente admin.", function() {			var users=new Array();			users.push({_id:'aa',email:'aa@jk.com', password:'pass', level:1});			var config={pages:2};			var createUsersListReturn=createUsersList(users,config);			var createUsersListJSON=JSON.parse(createUsersListReturn);			expect(createUsersListJSON[2]).to.have.property('pages');		});			it("Il valore di page è errato.", function() {			var users=new Array();			users.push({_id:'aa',email:'aa@jk.com', password:'pass', level:1});			var config={pages:2};			var createUsersListReturn=createUsersList(users,config);			var createUsersListJSON=JSON.parse(createUsersListReturn);			expect(createUsersListJSON[2].pages).equal(2);		});				it("I campi labels,data o inetrni ad essi non sono definiti. Caso Utente admin.", function() {			var users=new Array();			users.push({_id:'aa',email:'aa@jk.com', password:'pass', level:1});			var config={pages:2};			var createUsersListReturn=createUsersList(users,config);			var createUsersListJSON=JSON.parse(createUsersListReturn);			expect(createUsersListJSON[1][0]).to.have.property('_id');			expect(createUsersListJSON[1][0]).to.have.property('data');			expect(createUsersListJSON[1][0].data).to.have.property('_id');			expect(createUsersListJSON[1][0].data).to.have.property('email');			expect(createUsersListJSON[1][0].data).to.have.property('level');				});				it("I valori dell'etichetta sono errati. Caso Utente admin.", function() {			var users=new Array();			users.push({_id:'aa',email:'aa@jk.com', password:'pass', level:1});			var config={pages:2};			var createUsersListReturn=createUsersList(users,config);			var createUsersListJSON=JSON.parse(createUsersListReturn);			expect(createUsersListJSON[0][0]).equal('ID');			expect(createUsersListJSON[0][1]).equal('Email');			expect(createUsersListJSON[0][2]).equal('Level');			expect(createUsersListJSON[1][0].data._id).equal(users[0]._id);			expect(createUsersListJSON[1][0].data.email).equal(users[0].email);			expect(createUsersListJSON[1][0].data.level).equal('administrator');		});	});	describe("Test createUser:", function() {		var createUser=require("../../../maap_server/modelServer/dataManager/JSonComposer.js").createUser;		var user={_id:'aa',email:'aa@jk.com', password:'pass', level:1};		var createUserReturn=createUser(user);		var createUserJSON=JSON.parse(createUserReturn);				it("I campi _id, mail, o interni level non sono definiti. Caso Utente admin.", function() {			expect(createUserJSON).to.have.property('label');			expect(createUserJSON).to.have.property('data');			expect(createUserJSON.data).to.have.property('id');			expect(createUserJSON.data).to.have.property('email');			expect(createUserJSON.data).to.have.property('level');		});				it("I campi _id, mail, o interni level non sono definiti. Caso Utente admin.", function() {			expect(createUserJSON.label[0]).equal('ID');			expect(createUserJSON.label[1]).equal('Email');			expect(createUserJSON.label[2]).equal('Level');			expect(createUserJSON.data.id).equal(user._id);			expect(createUserJSON.data.email).equal(user.email);			expect(createUserJSON.data.level).equal('administrator');					});				it("I campi _id, mail, o interni level non sono definiti. Caso Utente user.", function() {			var createUser=require("../../../maap_server/modelServer/dataManager/JSonComposer.js").createUser;			var user={_id:'aa',email:'aa@jk.com', password:'pass', level:0};			var createUserReturn=createUser(user);			var createUserJSON=JSON.parse(createUserReturn);			expect(createUserJSON).to.have.property('label');			expect(createUserJSON).to.have.property('data');			expect(createUserJSON.data).to.have.property('id');			expect(createUserJSON.data).to.have.property('email');			expect(createUserJSON.data).to.have.property('level');		});				it("I campi _id, mail, o interni level non sono definiti. Caso Utente user.", function() {			var createUser=require("../../../maap_server/modelServer/dataManager/JSonComposer.js").createUser;			var user={_id:'aa',email:'aa@jk.com', password:'pass', level:0};			var createUserReturn=createUser(user);			var createUserJSON=JSON.parse(createUserReturn);			expect(createUserJSON.label[0]).equal('ID');			expect(createUserJSON.label[1]).equal('Email');			expect(createUserJSON.label[2]).equal('Level');			expect(createUserJSON.data.id).equal(user._id);			expect(createUserJSON.data.email).equal(user.email);			expect(createUserJSON.data.level).equal('user');					});				});