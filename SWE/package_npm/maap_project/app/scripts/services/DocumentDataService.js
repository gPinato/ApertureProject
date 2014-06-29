/**
 * File: DocumentDataService;
 * Module: modulo di appartenenza;
 * Author: Giacomo Pinato;
 * Created: 12/05/14;
 * Version: versione corrente;
 * Description: Factory that returns a $resource 
 * 	bounded to a specific Document;
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */

'use strict';

angular.module('services')
    .factory('DocumentDataService', ['$resource', function ($resource) {
		
		//DO NOT EDIT THE NEXT LINE - Maaperture server will update the var hostURL = 'http://localhost:9000';
		//using the configuration file's settings everytime the server will start up.
		var hostURL = 'http://localhost:9000';
		
        return $resource( hostURL + '/api/collection/:col_id/:doc_id',
            {col_id: '@col_id', doc_id: '@doc_id'}, {
                'query': {method: 'GET'}

            });

    }]);










