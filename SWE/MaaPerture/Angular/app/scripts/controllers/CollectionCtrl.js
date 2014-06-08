/**
 * File: CollectionCtrl;
 * Module: app:controllers;
 * Author: Giacomo Pinato;
 * Created: 10/05/14;
 * Version: versione corrente;
 * Description: Controller for the collection view
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.3 Added sorting logic
 * 0.2 Added services support
 * 0.1 File creation
 ==============================================
 */
'use strict';

angular.module('maaperture').controller('CollectionCtrl', function ($scope, CollectionDataService,AuthService, $routeParams) {

    var init= function (){
        $scope.current_sorted_column = null;
        $scope.column_original_name=[];
        $scope.current_sort= null;
        $scope.current__page=0;
        $scope.canEdit = true; //DA CAMBIARE CON QUERY
        $scope.current_collection = { id: $routeParams.col_id };
        getData();

    };

    var getData = function (){
        $scope.data = CollectionDataService.query({
            col_id:$routeParams.col_id,
            order: $scope.current_sort,
            column: $scope.column_original_name[$scope.current_sorted_column],
            page: $scope.current__page

        },function() {
            $scope.labels = $scope.data[0];
            $scope.rows = $scope.data[1];
            //$scope.pages = $scope.data[3];
            $scope.pages = 4;
            $.each( $scope.rows[0].data, function( key, value ) {
                $scope.column_original_name.push(key);
            });
        });
    }

    init();

    $scope.numerify = function(num) {
        return new Array(num);
    }

    $scope.previousPage = function(){
        if ($scope.current__page > 0)
            $scope.current__page--;
        getData();
    }
    $scope.nextPage = function(){
        if ($scope.current__page <$scope.pages-1)
        $scope.current__page++;
        getData();
    }
    $scope.toPage = function(index){
        $scope.current__page = index;
        getData();
    }

    var changeSort = function(){
        if ($scope.current_sort == "desc"){
            $scope.current_sort = "asc";
        }
        else {$scope.current_sort = "desc"}
    };

    $scope.columnSort = function($index){
        //Determine if we must only change the sorting or the column to sort.
        if ($index == $scope.current_sorted_column ){
            changeSort();
            getData();
        }
        else {
            $scope.current_sorted_column = $index;
            $scope.current_sort="asc";
            getData();
        }
    }

});