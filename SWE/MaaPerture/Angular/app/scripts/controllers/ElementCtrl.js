/**
 * File: ElementCtrl;
 * Module: modulo di appartenenza;
 * Author: jack;
 * Created: 10/05/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History: tabella dei cambiamenti effettuati sul file.
 */
/**
 * Created by jack on 09/05/14.
 */
'use strict';

angular.module('maaperture').controller('ElementCtrl', function ($scope,CollectionDataService, $routeParams) {
    $scope.rows = CollectionDataService.getProperty();
    $scope.element = $scope.rows[$routeParams.id]

});