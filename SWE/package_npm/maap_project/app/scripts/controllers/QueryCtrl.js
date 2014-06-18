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

angular.module('maaperture').controller('QueryCtrl', function ($scope, $route, $location,QueryService,IndexService) {

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

        QueryService.query({


            }, function success(response) {
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


    $scope.createIndex = function(id){
        IndexService.insert({},
            id,
            function success(response) {
                alert("indice creato!");

            },
            function(error){
                alert("error");
            }
        );


    };
    //funzione per stampare correttamente il numero di pagine
    $scope.numerify = function (num) {
        return new Array(num);
    };
    //Torna alla pagina precedente
    $scope.previousPage = function () {
        if ($scope.current_page > 0) {
            $scope.current_page--;
        }
        getData();
    };
    //Va alla pagina successiva
    $scope.nextPage = function () {
        if ($scope.current_page < $scope.pages - 1) {
            $scope.current_page++;
        }
        getData();
    };
    //Va alla pagina $index
    $scope.toPage = function (index) {
        $scope.current_page = index;
        getData();
    };
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
    $scope.delete_document = function (index) {
        QueryService.remove({
                index: index
            },

            function success() {
                $location.path('/queries/');
            },
            function err(error) {
            }
        );
    };

});