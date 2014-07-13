/**
 * File: QueryCtrl;
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

angular.module('maaperture').controller('IndexCtrl', function ($scope, $route, $location,IndexService) {

    //Funzione di inizializzazione del controller
    var init = function () {
        $scope.current_sorted_column = null;
        $scope.column_original_name = [];
        $scope.current_sort = null;
        $scope.current_page = 0;
        $scope.rows = [];
        getData();

    };

    //Funzione di recupero dei dati dal server.
    //In base ai parametri dello scope effettua una query sul server e recupera i dati
    //da visualizzare

    var getData = function () {

        IndexService.query({

            }).$promise.then( function success(response) {
                $scope.labels = response[0];
                $scope.data = response[1];
                //$scope.pages = response[2].pages;

                //Salva i nomi originali delle colonne per le query a database
                $.each($scope.data[0].data, function (key, value) {
                    $scope.column_original_name.push(key);
                });


                for (var i = 0; i < Object.keys($scope.data).length; i++) {
                    //Copia i valori da stampare in un array per mantenere l'ordine
                    //Ogni riga viene salvata in un array contenuto nell'oggetto rows.
                    $scope.rows[i] = [];
                    $.each($scope.data[i].data, function (key, value) {
                        $scope.rows[i].push(value);
                    });

                }
                //Nel caso di aggiornamento dei dati rimuovo quelli vecchi.
                $scope.rows.splice(i, $scope.rows.length);

            },
            function err(error) {
                $location.path("/404");
            }
        );
    };

    init();


    
    //cambia ordinamento corrente, da asc a desc o viceversa
    var changeSort = function () {
        if ($scope.current_sort === "desc") {
            $scope.current_sort = "asc";
        }
        else {
            $scope.current_sort = "desc";
        }
    };
    //Ordina la colonna di posizione $index
    $scope.columnSort = function (index) {
        //Determina se cambiare solo ordinamento o anche colonna ordinata
        if (index === $scope.current_sorted_column) {
            changeSort();
            getData();
        }
        else {
            //cambia anche la colonna ordinata
            $scope.current_sorted_column = index;
            $scope.current_sort = "asc";
            getData();
        }
    };
    //funzione per cancellare il documento di indice index
    $scope.delete = function (index) {
        IndexService.remove({
                index_name: index._id,
				col_name: index.data.collection
            }).$promise.then(

            function success() {
                $location.path('/indexes');
				$route.reload();
            },
            function err(error) {
                alert("Qualcosa è andato storto..");
            }
        );
    };

    //=====================================================================
    //Funzioni per paginazione avanzata
    $scope.range = function() {

        var rangeSize;
        if( $scope.pages < 9){
            rangeSize = $scope.pages;
        }
        else{
            rangeSize = 9;
        }

        var ps = [];

        var start;

        if ( $scope.current_page > 3){
            start = $scope.current_page-3;
        }
        else{
            start = $scope.current_page;
        }

        if ( start > $scope.pages-rangeSize ) {

            start = $scope.pages-rangeSize;

        }

        for (var i=start; i<start+rangeSize; i++) {

            ps.push(i);

        }

        return ps;

    };


    $scope.prevPage = function() {

        if ($scope.current_page > 0) {

            $scope.current_page--;
            getData();
        }

    };


    $scope.DisablePrevPage = function() {

        return $scope.current_page === 0 ? "disabled" : "";

    };




    $scope.nextPage = function() {

        if ($scope.current_page < $scope.pages - 1) {
            $scope.current_page++;
            getData();
        }

    };


    $scope.DisableNextPage = function() {

        return $scope.current_page === $scope.pages - 1 ? "disabled" : "";

    };

    //Va alla pagina $index
    $scope.toPage = function (index) {
        $scope.current_page = index;
        getData();
    };


});