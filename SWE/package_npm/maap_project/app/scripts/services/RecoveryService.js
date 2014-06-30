/**
 * File: RecoveryService;
 * Module: services;
 * Author: Giacomo Pinato;
 * Created: 01/06/14;
 * Version: versione corrente;
 * Description: Recovers the password
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

angular.module('services')
    .factory('QueryService', ['$resource', function ($resource) {

        //DO NOT EDIT THE NEXT LINE - Maaperture server will update the var hostURL = 'http://localhost:9000';
        //using the configuration file's settings everytime the server will start up.
        var hostURL = 'http://localhost:9000';

        return $resource( hostURL + '/api/forgotPassword', {}, {
            'recover': {method: 'POST'}
        });

    }]);
