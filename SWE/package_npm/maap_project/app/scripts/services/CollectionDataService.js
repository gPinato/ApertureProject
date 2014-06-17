/**
 * File: CollectionDataService;
 * Module: app::services;
 * Author: Giacomo Pinato;
 * Created: 09/05/14;
 * Version: versione corrente;
 * Description: Factory that returns a $resource 
 * 	bounded with a specific Collection;
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

angular.module('services')
    .factory('CollectionDataService', ['$resource', function ($resource) {
        return $resource('http://localhost:9000/api/collection/:col_id',
            {col_id: '@col_id'});

    }]);
