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
 * 0.4 Fixed Angular auto sorting results
 * 0.3 Added sorting logic
 * 0.2 Added services support
 * 0.1 File creation
 ==============================================
 */

'use strict';

angular.module('maaperture').controller('CollectionCtrl', function ($scope,$route,$location,DocumentEditService, CollectionDataService,AuthService, $routeParams) {

    var init= function (){
        $scope.current_sorted_column = null;
        $scope.column_original_name=[];
        $scope.current_sort= null;
        $scope.current_page=0;
        $scope.canEdit = true; //DA CAMBIARE CON QUERY
        $scope.current_collection = $routeParams.col_id;
        $scope.rows = [];
        getData();

    };



    var getData = function () {

        CollectionDataService.query({
            col_id: $routeParams.col_id,
            order: $scope.current_sort,
            column: $scope.column_original_name[$scope.current_sorted_column],
            page: $scope.current_page

        }, function success(response) {
            $scope.labels = response[0];
            $scope.data = response[1];
            //$scope.pages = response[2];
            $scope.pages = 4;
            $.each($scope.data[0].data, function (key , value) {
                $scope.column_original_name.push(key);
            });


            for (var i = 0; i < Object.keys($scope.data).length ; i++) {

                $scope.rows[i] = [];
                $.each($scope.data[i].data, function (key , value) {
                    $scope.rows[i].push(value);
                });

            }

            $scope.rows.splice(i,$scope.rows.length)

        },
            function err(error) {
                $location.path("/404");
            }
        );
    };

    init();


    $scope.numerify = function(num) {
        return new Array(num);
    };

    $scope.previousPage = function(){
        if ($scope.current_page > 0)
            $scope.current_page--;
        getData();
    };

    $scope.nextPage = function(){
        if ($scope.current_page < $scope.pages - 1)
        $scope.current_page++;
        getData();
    };

    $scope.toPage = function(index){
        $scope.current_page = index;
        getData();
    };

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
    };

    $scope.delete_document = function(index) {
        DocumentEditService.remove({
                col_id: $scope.current_collection,
                doc_id: index
            },

            function success() {
                $location.path('/collection/'+$scope.current_collection);
            },
            function err(error) {
            }
        );
    };

});