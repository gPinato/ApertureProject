/**
 * Created by jack on 09/05/14.
 */
'use strict';

angular.module('angularyoApp').controller('detail', function ($scope, firstservice, $routeParams) {
    //var todosInStore = localStorageService.get('todos');
    var rows=firstservice.getProperty();
    $scope.message =rows[$routeParams.id]

});