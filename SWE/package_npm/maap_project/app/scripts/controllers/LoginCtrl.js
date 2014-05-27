/**
 * File: LoginCtrl;
 * Module: modulo di appartenenza;
 * Author: Giacomo Pinato;
 * Created: 16/05/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History:
 * ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

angular.module('maaperture').controller('LoginCtrl', function ($scope,$location,AuthService) {
    $scope.credentials = {
        email: '',
        password: ''
    };


    $scope.login = function () {
        AuthService.login({}, $scope.credentials,
           function success(data, status) {
                $location.url('/');
            },
           function error (data, status) {
            });

    };

});

