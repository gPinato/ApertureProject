/**
 * File: DocumentEditService;
 * Module: modulo di appartenenza;
 * Author: Giacomo Pinato;
 * Created: 13/05/14;
 * Version: versione corrente;
 * Description: Factory che ritorna una $resource legata ad un
 * 	particolare Document, modificabile;
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
        return $resource('http://localhost:9000/api/collection/:col_id/:doc_id/edit',
            {col_id: '@col_id', doc_id: '@doc_id'}, {
                'query': {method: 'GET'},
                'update': {method: 'PUT'},
                'remove': {method: 'DELETE'}
            });

    }]);
