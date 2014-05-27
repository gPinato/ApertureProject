/**
 * File: Authservice;
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
angular.module('services')
    .factory('AuthService',['$resource',function($resource) {
        return $resource('http://localhost:8080/api/login', {}, {
            'login':  {method:'POST'}
        });
    }
    ]);

