/**
 * File: PwdRecoverycTRL;
 * Module: app:controllers;
 * Author: Giacomo Pinato;
 * Created: 10/05/14;
 * Version: versione corrente;
 * Description: Controller for the collection view
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */

 'use strict';

angular.module('maaperture').controller('PwdRecoveryCtrl', function ($scope,$route,$cookieStore, $location, RecoveryService) {
    $scope.credentials = {
        email: ''

    };

    //Funzione per il login.
    //Richiede al server di validare le credenziali inserite.
    $scope.recover = function () {
        RecoveryService.recover(
            {}, $scope.credentials,
            function success(data, status) {
                $location.path('/');
                $route.reload();

            },
            function error(data, status) {
            });

    };

});

