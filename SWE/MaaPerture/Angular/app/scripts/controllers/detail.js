/**
 * Created by jack on 09/05/14.
 */
'use strict';

angular.module('angularyoApp').controller('detail', function ($scope, $routeParams) {
    //var todosInStore = localStorageService.get('todos');

    $scope.message = messages[$routeParams.id];
});