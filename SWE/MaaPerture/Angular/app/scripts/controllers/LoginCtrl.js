/**
 * File: LoginCtrl;
 * Module: modulo di appartenenza;
 * Author: jack;
 * Created: 16/05/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History: tabella dei cambiamenti effettuati sul file.
 */
'use strict';

angular.module('maaperture').controller('LoginCtrl', function ($scope,$location,AuthService) {
    $scope.credentials = {
        email: '',
        password: ''
    };


    $scope.login = function () {
        AuthService.login({}, $scope.credentials,
           function(data, status) {
                $location.url('/');

                alert(data);
            },
           function(data, status) {
            });

    };

});

