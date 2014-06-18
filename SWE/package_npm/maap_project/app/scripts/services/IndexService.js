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
        return $resource('http://localhost:9000/api/indexes/:index_name',
            {index_name: '@index_name'}, {
                'query': {method: 'GET'},
                'insert': {method: 'PUT'},
                'remove': {method: 'DELETE'}
            });

    }]);
