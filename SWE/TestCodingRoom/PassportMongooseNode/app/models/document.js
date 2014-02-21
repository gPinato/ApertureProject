var mongoose = require('mongoose');

//modello del document per mongoose
//qui do il nome document, verrà creata una collection documentS con la S finale!
module.exports = mongoose.model('document', {
	nome : String, 	//nome del documento
	info : String	//info del documento
});