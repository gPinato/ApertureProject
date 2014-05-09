/**
 * Created by jack on 09/05/14.
 */
'use strict';

angular.module('angularyoApp').controller('ControllerColl', function ($scope,firstservice,  localStorageService) {
    //var todosInStore = localStorageService.get('todos');

    $scope.rows=firstservice.getProperty();


    $scope.viewitem = function (index) {
        $scope.todos.splice(index, 1);
    };
});