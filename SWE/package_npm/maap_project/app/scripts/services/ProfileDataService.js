/**
 * File: ProfileDataService;
 * Module: modulo di appartenenza;
 * Author: Giacomo Pinato;
 * Created: 20/05/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

angular.module('services')
    .factory('ProfileDataService', ['$resource', function ($resource) {
        return $resource('http://localhost:9000/api/profile', {}, {
            'query': {method: 'GET'}
        });
    }
    ]);

