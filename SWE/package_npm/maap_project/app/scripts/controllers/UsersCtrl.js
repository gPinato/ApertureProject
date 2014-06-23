/**
 * File: UsersCtrl;
 * Module: app:controllers;
 * Author: Giacomo Pinato;
 * Created: 10/05/14;
 * Version: versione corrente;
 * Description: Controller for the collection view
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.4 Fixed Angular auto sorting results
 * 0.3 Added sorting logic
 * 0.2 Added services support
 * 0.1 File creation
 ==============================================
 */

'use strict';

angular.module('maaperture').controller('UsersCtrl', function ($scope, $location, UserDataService, UserEditService, $routeParams) {

    $scope.current_document = $routeParams.user_id;
    $scope.values = [];

    //Funzione per richiedere un documento al server.
    //Passa come parametri la collection e il documento da ricevere
    UserDataService.query({
            user_id: $routeParams.user_id },
        function success(response) {
            $scope.data = response.data;
            $.each($scope.data, function (key, value) {
                //salva i valori in un array per non perdere l'ordinamento
                $scope.values.push(value);
            });
            //Salva le etichette in un array
            $scope.labels = response.label;
        },
        function error (err){
            $location.path("/404");

        }

    );

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
