/**
 * File: Authservice;
 * Module: modulo di appartenenza;
 * Author: jack;
 * Created: 12/05/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History: tabella dei cambiamenti effettuati sul file.
 */
angular.module('services')
    .factory('AuthService',['$resource',function($resource) {
        return $resource('http://localhost:8080/api/login', {}, {
            'login':  {method:'POST'}
        });
    }
    ]);

