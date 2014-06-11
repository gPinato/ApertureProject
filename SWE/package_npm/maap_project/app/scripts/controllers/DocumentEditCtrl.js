/**
 * File: DocumentEditCtrl;
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
angular.module('maaperture').controller('DocumentEditCtrl', function ($scope,$location,DocumentEditService,AuthService, $routeParams) {
    $scope.current_collection = $routeParams.col_id ;
    $scope.current_document = $routeParams.doc_id;
    $scope.canEdit = true;
    $scope.toedit=[];
    $scope.original_keys = [];


    DocumentEditService.query({ col_id:$routeParams.col_id, doc_id:$routeParams.doc_id },
        function success(data) {
            $scope.labels = data.label;
            $scope.data = data.data;
            $.each( $scope.data, function( key, value ) {
                $scope.original_keys.push(key);
                $scope.toedit.push(value);
            });
        },
        function err(error){
        }
    );

    //Called when the edited data must be sent to the server.
    $scope.edit_document = function() {
        var new_data = {};
        for (var i = 0; i < $scope.labels.length; i++) {
            new_data[$scope.original_keys[i]] = $scope.toedit[i];
        }
        var json_data = JSON.stringify(new_data);
        DocumentEditService.update({
                col_id: $scope.current_collection,
                doc_id: $scope.current_document
            },
            json_data,
            function success() {
                $location.path('/collection/'+$scope.current_collection+'/'+$scope.current_document);
            },
            function err(error) {
            }
        );
    };

    $scope.delete_document = function() {
        DocumentEditService.remove({
                col_id: $scope.current_collection,
                doc_id: $scope.current_document
            },

            function success() {
                $location.path('/collection/'+$scope.current_collection);
            },
            function err(error) {
            }
        );
    };
});
