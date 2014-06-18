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

angular.module('maaperture').controller('NavBarCtrl', function ($scope,$cookieStore,$location,$route, LogoutService, CollectionListService) {
    $scope.isAdmin = $cookieStore.get("isAdmin");
    $scope.singup_enabled = true;

    //Funzione per richiedere al server la lista di collection presenti.

    CollectionListService.get(
        function success(data) {
            $scope.labels = data.labels;
            $scope.values = data.data;
            $location.refresh();
        });

    //Funzione per effettuare il logout.
    $scope.logout = function () {
        $location.path('/login');
        $route.reload();
        LogoutService.logout(),

            function success(response) {
                $cookieStore.put("loggedIn", false);
                $scope.isLoggedIn = false;

            },
            function error(error) {

            };
    };



});
