/**
 * File: DocumentDataService;
 * Module: modulo di appartenenza;
 * Author: Giacomo Pinato;
 * Created: 12/05/14;
 * Version: versione corrente;
 * Description: Factory che ritorna una $resource legata ad un singolo
 * Document;
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
        return $resource('http://localhost:9000/api/collection/:col_id/:doc_id',
            {col_id: '@col_id', doc_id: '@doc_id'}, {
                'query': {method: 'GET'}

            });

    }]);
