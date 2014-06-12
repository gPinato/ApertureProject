/**
 * File: RegisterCtrl;
 * Module: modulo di appartenenza;
 * Author: Giacomo Pinato;
 * Created: 18/05/14;
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

angular.module('maaperture').controller('RegisterCtrl', function ($scope, $location, RegisterService) {
    $scope.credentials = {
        email: '',
        pwd1: '',
        pwd2: ''
    };

    $scope.submitted = false;
    $scope.signupForm = function () {
        if ($scope.signup_form.$valid) {
            RegisterService.register({},
                $scope.credentials,
                function success() {
                    //welcome to the maap
                    $location.path("/");
                },
                function err(error) {
                }
            );
        }

        else {
            $scope.signup_form.submitted = true;
        }
        ;
    }

});

