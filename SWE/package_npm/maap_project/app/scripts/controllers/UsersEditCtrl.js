/**
 * File: UserEditCtrl;
 * Module: mapp:controllers;
 * Author: Giacomo Pinato;
 * Created: 12/05/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.3 Redesign of returned data
 * 0.2 Added services support
 * 0.1 File creation
 ==============================================
 */

'use strict';

angular.module('maaperture').controller('UserEditCtrl', function ($scope, $location, UserEditService, $routeParams) {
    $scope.current_document = $routeParams.user_id;
    $scope.original_data = [];
    $scope.original_keys = [];

    //Funzione per richiedere un documento al server.
    //Passa come parametri la collection e il documento da ricevere
    UserEditService.query({
            user_id: $routeParams.user_id },
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

    //Funzione per inviare al server il nuovo documento
    $scope.edit_document = function () {
        var new_data = {};
        //Assembla il json da trasmettere.
        for (var i = 0; i < $scope.labels.length; i++) {
            new_data[$scope.original_keys[i]] = $scope.original_data[i];
        }
        //trasforma l'oggetto new_data in JSON.
        var json_data = JSON.stringify(new_data);
        //Trasmette al server il nuovo json
        UserEditService.update({
                user_id: $scope.current_document
            },
            json_data,
            function success() {
                $location.path('/users/' + $scope.current_document);
            },
            function err(error) {
                $location.path("/404");
            }
        );
    };

    //Funzione per richiedere la cancellazione di un documento
    $scope.delete_document = function () {
        UserEditService.remove({
                user_id: $scope.current_document
            },

            function success() {
                $location.path('/users/');
            },
            function err(error) {
            }
        );
    };
});
