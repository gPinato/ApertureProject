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

angular.module('maaperture').controller('DocumentCtrl', function ($scope,DocumentDataService,AuthService, $routeParams) {
    $scope.current_collection = { id: $routeParams.col_id };
    $scope.current_document = { id: $routeParams.doc_id };
    //$scope.data = DocumentDataService.query({col_id:$routeParams.col_id,doc_id:$routeParams.doc_id });
    DocumentDataService.query({col_id:$routeParams.col_id,doc_id:$routeParams.doc_id },
        function success(data) {
            $scope.data = data;
        }

    );
    $scope.canEdit =true;
});
