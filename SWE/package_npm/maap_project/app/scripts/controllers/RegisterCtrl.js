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

angular.module('maaperture').controller('RegisterCtrl', function ($scope, $location, $route, $cookieStore, RegisterService) {
    $scope.credentials = {
        email: '',
        pwd1: '',
        pwd2: ''
    };

    $scope.submitted = false;
    //Funzione per inviare il form di registrazione al server.
    //Invia soltanto se il client ritiene che il form sia compilato con dati validi.
    $scope.signupForm = function () {
        if ($scope.signup_form.$valid) {
            RegisterService.register({},
                $scope.credentials,
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
                function err(error) {
					alert("Registration failed! We already have this email in our databases ;)");
				}
		
            );
        }

        else {
            $scope.signup_form.submitted = true;
        }

    };

});

