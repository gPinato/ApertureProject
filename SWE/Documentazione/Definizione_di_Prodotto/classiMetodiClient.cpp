//ControllerAutenticazione
? login(email, password);
? registerUser(email, password); 		//di default registra un utente base
? forgotPassword(email);

//ControllerCollection
JSON viewCollection(coll_ID, order, order_type, elem, page);
? deleteDocument(doc_ID);

//ControllerProfilo
? addUser(email, password, level);		//per l'amministratore
? deleteUser(email);					//per l'amministratore
? setPermissionsUser(email, level); 	//per l'amministratore
? setUserData(email, password);

//ControllerMenu
JSON viewListCollection();	
? disconnect();

//ControllerDocument
JSON viewDocument(doc_ID);
? deleteDocument(doc_ID);
? editDocument(doc_ID, JSONdata);

//ControllerIndici
JSON viewIndexList();
JSON viewQueryList();
? createIndex(query_ID);
? deleteIndex(index_ID);

 