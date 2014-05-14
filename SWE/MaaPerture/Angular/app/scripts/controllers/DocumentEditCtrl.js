/**
 * File: DocumentEditCtrl;
 * Module: modulo di appartenenza;
 * Author: jack;
 * Created: 12/05/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History: tabella dei cambiamenti effettuati sul file.
 */
angular.module('maaperture').controller('DocumentEditCtrl', function ($scope,DocumentDataService,AuthService, $routeParams) {
    $scope.current_collection = { id: $routeParams.col_id };
    $scope.current_document = { id: $routeParams.doc_id };
    $scope.canEdit = AuthService.canEdit();
    //$scope.data = DocumentDataService.get({col_id:$routeParams.col_id,doc_id:$routeParams.doc_id });
    $scope.toedit=[];

    DocumentDataService.query({col_id:$routeParams.col_id,doc_id:$routeParams.doc_id },
        function success(data) {
            $scope.data = data;
        },
        function err(error){
            ErrorHandler.handle(error);
        }
    );

    $scope.edit_document = function() {
        DocumentDataService.update({
                collectionId: $scope.current_collection,
                documentId: $scope.current_document
            },
            $scope.toedit,
            function success() {
                FlashMessage.future({ type: "success", title: "Success!", message: "Document has been updated." });
                $location.path("/collections/"+$scope.collection.id+"/"+$scope.document.id);
            },
            function err(error) {
                ErrorHandler.handle(error);
            }
        );
    };

});
/*
{
    "label": [
    "Name",
    "Address",
    "Sex",
    "Email",
    "Created at",
    "I Lack fantasy"
],
    "data": {
    "customer": "Gianni Smartface",
        "Address": "Via dei Fagiani 22, Fagianopoli",
        "Sex": "never",
        "email": "gianni@definitelynotgoogle.com",
        "date": "15/12/2015",
        "Something": "something else"
}
}
    */