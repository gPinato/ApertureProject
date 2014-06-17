/**
 * File: ProfileCtrl;
 * Module: mapp:controllers;
 * Author: Giacomo Pinato;
 * Created: 12/05/14;
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

angular.module('maaperture').controller('ProfileCtrl', function ($scope, $location, ProfileEditService) {


    $scope.original_data = [];
    $scope.original_keys = [];

    //Funzione per richiedere il profilo al server.

    ProfileEditService.query({
             },
        function success(data) {
            $scope.labels = data.label;
            $scope.data = data.data;
            //inizializza un array con le chiavi originali e un array con i valori originali da modificare
            $.each($scope.data, function (key, value) {
                $scope.original_keys.push(key);
                $scope.original_data.push(value);
            });
        },
        function err(error) {
            $location.path("/404");

        }
    );


    //Funzione per richiedere la cancellazione del profilo
    $scope.delete_document = function () {
        ProfileEditService.remove({

            },

            function success() {
                $location.path('/');
            },
            function err(error) {
            }
        );
    };
});
