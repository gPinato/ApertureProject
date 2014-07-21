/**
 * File: UserCollectionService;
 * Module: app:services;
 * Author: Giacomo Pinato;
 * Created: 09/05/14;
 * Version: 0.1;
 * Description: Factory that returns a $resource
 * 	representing the functionality for user collection management;
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
		
		//DO NOT EDIT THE NEXT LINE - Maaperture server will update the var hostURL = 'http://localhost:9000';
		//using the configuration file's settings everytime the server will start up.
		var hostURL = 'http://localhost:9000';
		
        return $resource( hostURL + '/api/users/list',{
                 'query': {method: 'GET'}
            });

    }]);









