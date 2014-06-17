/**
 * File: UserEditService;
 * Module: modulo di appartenenza;
 * Author: Giacomo Pinato;
 * Created: 13/05/14;
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
    .factory('UserEditService', ['$resource', function ($resource) {
        return $resource('http://localhost:9000/api/users/:user_email/edit',
            {user_email: '@user_email'}, {
                'query': {method: 'GET'},
                'update': {method: 'PUT'},
                'remove': {method: 'DELETE'}
            });

    }]);
