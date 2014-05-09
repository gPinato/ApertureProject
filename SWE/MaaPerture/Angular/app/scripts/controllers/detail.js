/**
 * Created by jack on 09/05/14.
 */
'use strict';

angular.module('angularyoApp').controller('detail', function ($scope,firstservice, $routeParams) {
    $scope.rows=firstservice.getProperty();
    $scope.message = $scope.rows[$routeParams.id]

});