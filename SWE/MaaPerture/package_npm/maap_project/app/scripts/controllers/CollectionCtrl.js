/**
 * Created by jack on 09/05/14.
 */
'use strict';

angular.module('maaperture').controller('CollectionCtrl', function ($scope, CollectionDataService, localStorageService) {
    var todosInStore = localStorageService.get('todos');

    $scope.rows=CollectionDataService.getProperty();
    $scope.labels=CollectionDataService.getLabels();

    $scope.canEdit= function(){
        return true;
    }
});