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

angular.module('maaperture').controller('LoginCtrl', function ($scope,$route,$cookieStore, $location, AuthService) {
    $scope.credentials = {
        email: '',
        password: ''
    };

    //Funzione per il login.
    //Richiede al server di validare le credenziali inserite.
    $scope.login = function () {
        AuthService.login({}, $scope.credentials,
            function success(data, status) {
                if ( data.level === 1){
                    $cookieStore.put("isAdmin",true);
                }
                else{
                    $cookieStore.put("isAdmin",false);
                }
                $location.path('/');
                $route.reload();

            },
            function error(data, status) {
				 alert("Login failed, please check your email/password and try again!");
            });

    };

});

