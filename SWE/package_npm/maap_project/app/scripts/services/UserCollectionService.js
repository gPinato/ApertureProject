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
		
		//DO NOT EDIT THE NEXT LINE - Maaperture server will update the var hostURL value
		//using the configuration file's settings everytime the server will start up.
		var hostURL = 'maapertureServerWillWriteHere';
		
        return $resource( hostURL + '/api/users/list',{
                 'query': {method: 'GET'}
            });

    }]);



