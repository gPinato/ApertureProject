/**
 * File: DashboardCtrl;
 * Module: modulo di appartenenza;
 * Author: Giacomo Pinato;
 * Created: 01/06/14;
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

angular.module('maaperture').controller('DashboardCtrl', function ($scope, CollectionListService) {
    $scope.searchbox = null;
    // Servizio per ricevere la lista di collection dal server.
    $scope.Search = function (){
    CollectionListService.get({find:$scope.searchbox}).$promise.then(function success(data) {
            $scope.labels = data.labels;
            $scope.values = data.data;
        });
    };

    $scope.Search();
});
