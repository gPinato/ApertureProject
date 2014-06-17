/**
 * File: UserCollectionService;
 * Module: services;
 * Author: Giacomo Pinato;
 * Created: 09/05/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History:
 *  ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

angular.module('services')
    .factory('UserCollectionService', ['$resource', function ($resource) {
        return $resource('http://localhost:9000/api/users/list',{
                 'query': {method: 'GET'}
            });

    }]);
