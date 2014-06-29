/**
 * File: DocumentEditService;
 * Module: modulo di appartenenza;
 * Author: Giacomo Pinato;
 * Created: 13/05/14;
 * Version: versione corrente;
 * Description: Factory that returns a $resource 
 * 	bounded to a specific editable Document;
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */

'use strict';

angular.module('services')
    .factory('DocumentEditService', ['$resource', function ($resource) {
		
		//DO NOT EDIT THE NEXT LINE - Maaperture server will update the var hostURL value
		//using the configuration file's settings everytime the server will start up.
		var hostURL = 'maapertureServerWillWriteHere';
		
        return $resource( hostURL + '/api/collection/:col_id/:doc_id/edit',
            {col_id: '@col_id', doc_id: '@doc_id'}, {
                'query': {method: 'GET'},
                'update': {method: 'PUT'},
                'remove': {method: 'DELETE'}
            });

    }]);



