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
    CollectionListService.get(
        function success(data) {
            $scope.labels = data.labels;
            $scope.values = data.data;
        });
    $scope.isAdmin = false;

});
