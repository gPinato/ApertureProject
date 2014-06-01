/**
 * File: RegisterService;
 * Module: modulo di appartenenza;
 * Author: jack;
 * Created: 20/05/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 *
 ==============================================
 */


angular.module('services')
    .factory('RegisterService',['$resource',function($resource) {
        return $resource('http://localhost:9000/api/signup', {}, {
            'register':  {method:'POST'}
        });
    }
    ]);

