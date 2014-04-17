//IPassport - Passport
? login(email, password);
? disconnect(email);
bool isAuthenticated(email);
bool isAuthenticatedAdmin(email);

//FrontController


//Dispatcher (da spartire nei vari datamanager)

//DatabaseAnalysisManager
JSON viewCollection(coll_ID, order, order_type, elem, page);
JSON viewDocument(doc_ID);

//DataRetrieverAnalysis
JSON viewListCollection();	
JSON getCollection(coll_ID);
JSON getDocument(doc_ID);
? deleteDocument(doc_ID);
? editDocument(doc_ID, JSONdata);

//DatabaseUserManager

//DataRetrieverUsers
JSON getUserList();
? createUser(email, password, level);
? deleteUser(email);
? setUserData(email, password, level);

//IndexManager
JSON viewIndexList();
JSON viewQueryList();
? createIndex(query_ID);
? deleteIndex(index_ID);


//DSLParser
CollectionData parser(DSLdescriptionFile);

//DSLManager


//esempio router FrontController
app.post('/register',  !isAuthenticated(email), createUser(email,password,0));        //registrazione utente normale
app.post('/addUser',  isAuthenticatedAdmin(email), createUser(email,password,level)); //per l'amministratore







 