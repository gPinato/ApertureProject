/**
 * File: CollectionListService;
 * Module: services;
 * Author: Giacomo Pinato;
 * Created: 01/06/14;
 * Version: versione corrente;
 * Description: Factory that returns a $resource
 * 	bounded to the list of avaliable Collections;
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

angular.module('services')
    .factory('CollectionListService', ['$resource', function ($resource) {
        return $resource('http://localhost:9000/api/collection/list');

    }]);

