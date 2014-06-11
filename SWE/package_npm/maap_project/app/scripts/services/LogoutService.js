/**
 * File: LogoutService;
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
angular.module('services')
    .factory('LogoutService', ['$resource', function ($resource) {
        return $resource('http://localhost:9000/api/logout', {}, {
            'logout': {method: 'GET'}
        });
    }
    ]);

