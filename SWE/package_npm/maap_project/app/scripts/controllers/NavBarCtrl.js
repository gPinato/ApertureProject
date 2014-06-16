/**
 * File: NavBarCtrl;
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

angular.module('maaperture').controller('NavBarCtrl', function ($scope,$location, LogoutService, CollectionListService) {
    $scope.isAdmin = false;
    $scope.singup_enabled = true;

    //Funzione per richiedere al server la lista di collection presenti.
    CollectionListService.get(
        function success(data) {
            $scope.labels = data.labels;
            $scope.values = data.data;
        });
    //Funzione per effettuare il logout.
    $scope.logout = function () {
        LogoutService.logout(),
            function success(response) {
                $location.path('/');
            },
            function error(error) {

            };
    };



});
