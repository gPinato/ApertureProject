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

describe('Controller: QueryCtrl', function () {

    // load the controller's module
    beforeEach(module('maaperture'));

    var MainCtrl,
        routeParams,
        scope,

        mockBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
        scope = $rootScope.$new();
        mockBackend = _$httpBackend_;


        MainCtrl = $controller('QueryCtrl', {
            $scope: scope,
            $routeParams:routeParams
        });

    }));

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            mockBackend = $injector.get('$httpBackend');
        });
    });
    /*
     it('should load labels from the services',  inject(function (CollectionDataService)  {

     mockBackend.expectGET('http://localhost:9000/api/collection/0?page=0')
     .respond(response);


     var result = MockColService.query({
     col_id: routeParams.col_id,
     order: scope.current_sort,
     column: scope.column_original_name[scope.current_sorted_column],
     page: scope.current_page

     });
     mockBackend.flush();
     console.log(result);
     expect(result).to.not.equal(null);


     }));
     */

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