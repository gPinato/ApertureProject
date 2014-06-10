/**
 * File: DocumentCtrl;
 * Module: app:controllers;
 * Author: Giacomo Pinato;
 * Created: 10/05/14;
 * Version: versione corrente;
 * Description: Controller for the document view
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.2 Added services support
 * 0.1 File creation
 ==============================================
 */


'use strict';

angular.module('maaperture').controller('DocumentCtrl', function ($scope,DocumentDataService,DocumentEditService,AuthService, $routeParams) {
    $scope.current_collection =  $routeParams.col_id ;
    $scope.current_document = $routeParams.doc_id ;
    $scope.values = [];
    $scope.canEdit =true;

    DocumentDataService.query({col_id:$routeParams.col_id,doc_id:$routeParams.doc_id },
        function success(response) {
            $scope.data = response.data;
            $.each( $scope.data, function( key, value ) {
                $scope.values.push(value);
            });
            $scope.labels = response.label;
        }

    );

    $scope.delete_document = function() {
        DocumentEditService.remove({
                col_id: $scope.current_collection,
                doc_id: $scope.current_document
            },

            function success() {
            },
            function err(error) {
            }
        );
    };

});
