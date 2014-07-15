/**
 * File: ControllerColl;
 * Module: modulo di appartenenza;
 * Author: jack;
 * Created: 10/05/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History: tabella dei cambiamenti effettuati sul file.
 */
'use strict';

describe('Controller: IndexCtrl', function () {

    // load the controller's module
    beforeEach(module('maaperture', 'services', 'ngResource', 'ngRoute'));

    var MainCtrl,
        routeParams,
        scope,
        deleteIndex,
        $httpBackend,
        data = [['a','b','c'],
            [1,2,3]];

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        routeParams={};
        routeParams.col_name=0;
        routeParams.index_name=0;
        deleteIndex={};
        deleteIndex._id=0;
        deleteIndex.data={};
        deleteIndex.data.collection=0;

        MainCtrl = $controller('IndexCtrl', {
            $scope: scope,
            $routeParams:routeParams
        });

    }));


    it('should set some data on the scope when successful', function () {
        // Given
        $httpBackend.whenGET('http://localhost:9000/api/indexes').respond(200, data);
        $httpBackend.whenGET('views/dashboard.html').respond(200);


        // When
        scope.getData();
        $httpBackend.flush();
        // Then
        expect(scope.data).toEqual(data[1]);
        expect(scope.labels).toEqual(data[0]);
        //expect(scope.pages).toEqual(data[2]);

    });

    it('should display an error when not successful', function () {
        // Given
        $httpBackend.whenGET('http://localhost:9000/api/indexes').respond(400);
        $httpBackend.whenGET('views/dashboard.html').respond(200);
        $httpBackend.whenGET('views/404.html').respond(200);



        // When
        //scope.loadData();
        $httpBackend.flush();
        // Then

    });

    it('should delete an index correctly', function () {
        // Given
        $httpBackend.whenGET('http://localhost:9000/api/indexes').respond(400);
        $httpBackend.whenDELETE('http://localhost:9000/api/indexes/0/0').respond(400);
        $httpBackend.whenGET('views/404.html').respond(200);

        $httpBackend.whenGET('views/dashboard.html').respond(200);


        // When
        scope.delete(deleteIndex);
        $httpBackend.flush();
        // Then
        //test sul path

    });

    it('should display an error when the delete fails', function () {
        // Given
        $httpBackend.whenGET('http://localhost:9000/api/indexes').respond(400);
        $httpBackend.whenDELETE('http://localhost:9000/api/indexes/0/0').respond(400);

        $httpBackend.whenGET('views/dashboard.html').respond(200);
        $httpBackend.whenGET('views/404.html').respond(200);



        // When
        scope.delete(deleteIndex);
        $httpBackend.flush();
        // Then


    });


    it('should initialize data correctly', function () {
        expect(scope.current_sorted_column).toBe(null);
        expect(scope.current_sort).toBe(null);
        expect(scope.column_original_name.length).toBe(0);
        expect(scope.current_page).toBe(0);
        expect(scope.rows.length).toBe(0);
    });



    it('should go to the correct page', function () {
        scope.current_page=2;
        scope.toPage(4);
        expect(scope.current_page).toBe(4);

    });

    it('should increase page correctly', function () {
        scope.pages = 3;
        scope.current_page=0;
        scope.nextPage();
        expect(scope.current_page).toBe(1);
        scope.current_page= 2 ;
        scope.nextPage();
        expect(scope.current_page).toBe(scope.pages - 1);
    });
    it('should decrease page correctly', function () {
        scope.pages = 3;
        scope.current_page=0;
        scope.prevPage();
        expect(scope.current_page).toBe(0);
        scope.current_page= scope.pages - 1 ;
        scope.prevPage();
        expect(scope.current_page).toBe(scope.pages - 2);
    });
    it('should change sort correctly', function () {
        scope.current_sort = "asc";
        scope.current_sorted_column = 0;

        scope.columnSort(1);
        expect(scope.current_sort).toBe("asc");
        expect(scope.current_sorted_column).toBe(1);
        scope.columnSort(1);
        expect(scope.current_sort).toBe("desc");
        scope.columnSort(1);
        expect(scope.current_sort).toBe("asc");

    });

    it('should calculate the correct range', function () {
        scope.pages = 3;
        var result = scope.range();
        expect(result.length).toBe(3);
        scope.pages = 10;
        result = scope.range();
        expect(result.length).toBe(9);
        scope.pages = 20;
        scope.current_page=8;
        result = scope.range();
        expect(result.length).toBe(9);
        expect(result[0]).toBe(5);
        expect(result[8]).toBe(13);
        scope.current_page=19;
        result = scope.range();
        expect(result.length).toBe(9);
        expect(result[0]).toBe(11);
        expect(result[8]).toBe(19);

    });

    it('should disable prev and next', function () {
        scope.pages = 10;
        scope.current_page = 0;
        expect(scope.DisablePrevPage()).toBe('disabled');
        scope.current_page = 1;
        expect(scope.DisablePrevPage()).toBe('');
        expect(scope.DisableNextPage()).toBe('');
        scope.current_page = scope.pages -1;
        expect(scope.DisableNextPage()).toBe('disabled');
    });



});