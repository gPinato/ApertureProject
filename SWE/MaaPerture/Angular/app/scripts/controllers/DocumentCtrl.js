/**
 * File: DocumentCtrl;
 * Module: modulo di appartenenza;
 * Author: jack;
 * Created: 10/05/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History: tabella dei cambiamenti effettuati sul file.
 */

'use strict';

angular.module('maaperture').controller('DocumentCtrl', function ($scope,DocumentDataService,AuthService, $routeParams) {
    $scope.current_collection = { id: $routeParams.col_id };
    $scope.current_document = { id: $routeParams.doc_id };
    $scope.document=DocumentDataService.getDocument()[$routeParams.doc_id];
    $scope.canEdit = AuthService.canEdit();
});