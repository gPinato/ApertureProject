mongoimport --host localhost --port 27017 --db dati --upsert --collection teams < teams.json
mongoimport --host localhost --port 27017 --db dati --upsert --collection members < members.json
mongoimport --host localhost --port 27017 --db dati --upsert --collection supermarket < supermarket.json
mongoimport --host localhost --port 27017 --db utenti --upsert --collection users < users.json