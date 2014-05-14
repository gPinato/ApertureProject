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
    $scope.document=DocumentDataService.getDocument()[$routeParams.doc_id]
    //$scope.extracted_data=document.data;
    $scope.toedit=[];

    $scope.save=function(){
        DocumentDataService.update()
    }
    var temp;

});
/*
{"ID":0,"data":{"customer": "Gianni Smartface",
    "Address":"Via dei Fagiani 22, Fagianopoli",
    "Sex":"never",
    "email": "gianni@definitelynotgoogle.com",
    "date":"15/12/2015",
    "Something":"something else"}
    */