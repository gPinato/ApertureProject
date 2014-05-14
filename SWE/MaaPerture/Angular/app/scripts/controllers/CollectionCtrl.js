/**
 * Created by jack on 09/05/14.
 */
'use strict';

angular.module('maaperture').controller('CollectionCtrl', function ($scope, CollectionDataService,AuthService, $routeParams) {
    $scope.data = CollectionDataService.query({col_id:$routeParams.col_id},function() {
        // GET: /user/123/card
        // server returns: [ {id:456, number:'1234', name:'Smith'} ];
        $scope.rows= $scope.data[1];
        $scope.labels= $scope.data[0];

    });
    $scope.current_collection = { id: $routeParams.col_id };


    $scope.canEdit = AuthService.canEdit();

});