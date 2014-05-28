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
 * 0.2 Added services support
 * 0.1 File creation
 ==============================================
 */
'use strict';
angular.module('maaperture').controller('DocumentEditCtrl', function ($scope,DocumentDataService,AuthService, $routeParams) {
    $scope.current_collection = { id: $routeParams.col_id };
    $scope.current_document = { id: $routeParams.doc_id };
    $scope.canEdit = true;
    //$scope.data = DocumentDataService.get({col_id:$routeParams.col_id,doc_id:$routeParams.doc_id });
    $scope.toedit=[];

    //Initialize "toedit" with the values of the json to edit.
    var init = function(){
        $.each( $scope.data.data, function( key, value ) {
            $scope.toedit.push("maap_system_unedited_value");
        });

    };

    DocumentDataService.query({ col_id:$routeParams.col_id, doc_id:$routeParams.doc_id },
        function success(data) {
            $scope.data = data;
            init();
        },
        function err(error){
            ErrorHandler.handle(error);
        }
    );

    $scope.edit_document = function() {
        DocumentDataService.update({
                col_id: $scope.current_collection,
                doc_id: $scope.current_document
            },
            $scope.toedit,
            function success() {
            },
            function err(error) {
                ErrorHandler.handle(error);
            }
        );
    };

});