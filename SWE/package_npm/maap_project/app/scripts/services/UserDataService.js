/**
 * File: UserDataService;
 * Module: modulo di appartenenza;
 * Author: Giacomo Pinato;
 * Created: 12/05/14;
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
    .factory('DocumentDataService', ['$resource', function ($resource) {
        return $resource('http://localhost:9000/api/users/:user_id',
            {user_id: '@user_id'}, {
                'query': {method: 'GET'}

            });

    }]);
