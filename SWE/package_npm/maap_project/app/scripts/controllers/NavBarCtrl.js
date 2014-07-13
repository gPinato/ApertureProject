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


    //Funzione per richiedere al server la lista di collection presenti.

    CollectionListService.get().$promise.then(
        function success(data) {
            $scope.labels = data.labels;
            $scope.values = data.data;
        });

    //Funzione per effettuare il logout.
    $scope.logout = function () {
        $location.path('/login');
		$route.reload();
        LogoutService.logout().$promise.then(
            function success(response) {
				$cookieStore.remove("loggedIn");
				$cookieStore.remove("isAdmin");
                $scope.isLoggedIn = false;
				$scope.isAdmin = false;
            },
            function error(error) {
				alert("I dunno why, but the logout failed :/");
				$location.path('/');
				$route.reload();
            });
    };



});
