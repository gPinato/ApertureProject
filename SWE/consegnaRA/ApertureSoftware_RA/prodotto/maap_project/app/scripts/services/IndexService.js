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
    .factory('IndexService', ['$resource', function ($resource) {
		
		//DO NOT EDIT THE NEXT LINE - Maaperture server will update the var hostURL = 'http://localhost:9000';
		//using the configuration file's settings everytime the server will start up.
		var hostURL = 'http://localhost:9000';
		
        return $resource( hostURL + '/api/indexes/:col_name/:index_name',
            {index_name : '@index_name', col_name : '@col_name'}, {
                'insert': {method: 'PUT'},
                'remove': {method: 'DELETE'}
            });

    }]);










