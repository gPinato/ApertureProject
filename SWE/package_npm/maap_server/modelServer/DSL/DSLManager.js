//DSL manager
// controlla la presenza di file dsl nell'apposita cartella definita
//nel file di configurazione e cerca di eseguire il parser di ogni file
// utilizzando DSLParser.js creato precedentemente con il tool "mpg"
// successivamente controlla che il risultato sia in formato JSON valido
// e salva il file result_x.js nella stessa cartella del dsl per ora..
// todo: scegliere dove salvare il risultato (collectionData...)

var fs = require('fs'); 
var path = require('path'); 
var parser = require('./DSLParser');

var checkDSL = function(app) {

	var config = app.config;
	var results = [];
    var list = fs.readdirSync(config.static_assets.dsl);
	var i = 0;
    list.forEach(function(file) {
		
        var filePath = config.static_assets.dsl + '/' + file;
        var stat = fs.statSync(filePath);
		var extension = path.extname(file);
        if (stat && stat.isFile() && extension == '.maap') {
			results.push(filePath);
			console.log('found dsl: ' + file);
			var DSLstring = fs.readFileSync(filePath).toString();
			console.log('parsing ' + file + '...');
		
			//tento il parsing del file dsl
			try {
				var result = parser.parse(DSLstring);
			} catch(err) {
			  	console.error('parsing error!');
				console.error('check your dsl file: ' + filePath);
				throw err; 
			}
			
			console.log('errors checking...');
			//test se il risultato è in formato JSON
			result = JSON.stringify(result, null, '\t');
			try {
				var risultatoJSON = JSON.parse(result);
			} catch(err) {
				console.error('parsing result error! [invalid_JSON]');
				console.error('check maaperture dsl parser: DSLParser.js');
				throw err; 
			}
			
			//salvo su file
			var saveFile = __dirname + '/collectionData/result_' + i + '.json';
			console.log('saving ' + saveFile);
			fs.writeFileSync(saveFile, result, 'utf-8', function (err) {
					if (err) {
						console.log("error writing result file!");
						throw err;
					} 
				}
			);
			
			console.log("data saved!");
						
			i++;
		}
    });

};

exports.checkDSL = checkDSL;
