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

describe('Controller: CollectionCtrl', function () {

    // load the controller's module
    beforeEach(module('maaperture'));

    var MainCtrl,
        routeParams,
        scope,
        MockColService,
        MockCall,
        response,
        mockBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
        scope = $rootScope.$new();
        mockBackend = _$httpBackend_;
        routeParams ={};
        routeParams.col_id=0;
        routeParams.doc_id=0;
        response =
            [ [ 'Timestamp', 'Message', 'Level' ],
                [ { _id: '52b31e950d715cff70000001', data: { label: [ '_id', 'Timestamp', 'Message', 'Level', 'Hostname' ],
                    data:
                    { _id: '52b320a93401a40800000006',
                        timestamp: 'today',
                        message: 'AMAIL',
                         level: 'info',
                        hostname: 'b6d91509-de9d-4be9-819d-e04de3699ad2' } } },
                    { _id: '52b31ebd3401a40800000002', data: [Object] },
                    { _id: '52b31ebd3401a40800000003', data: [Object] },
                    { _id: '52b3347f255fbb0800000021', data: [Object] } ],
                { pages: 4 } ];




        MainCtrl = $controller('CollectionCtrl', {
            $scope: scope,
            $routeParams:routeParams,
        });

    }));

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            mockBackend = $injector.get('$httpBackend');
            MockColService = $injector.get('CollectionDataService');
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
        expect(scope.current_sorted_column).to.equal(null);
        expect(scope.current_sort).to.equal(null);
        expect(scope.column_original_name.length).to.equal(0);
        expect(scope.current_page).to.equal(0);
        expect(scope.current_collection).to.equal(routeParams.col_id);
        expect(scope.rows.length).to.equal(0);
    });



    it('should go to the correct page', function () {
        scope.current_page=2;
        scope.toPage(4);
        expect(scope.current_page).to.equal(4);

    });

    it('should increase page correctly', function () {
        scope.pages = 3;
        scope.current_page=0;
        scope.nextPage();
        expect(scope.current_page).to.equal(1);
        scope.current_page= 2 ;
        scope.nextPage();
        expect(scope.current_page).to.equal(scope.pages - 1);
    });
    it('should decrease page correctly', function () {
        scope.pages = 3;
        scope.current_page=0;
        scope.prevPage();
        expect(scope.current_page).to.equal(0);
        scope.current_page= scope.pages - 1 ;
        scope.prevPage();
        expect(scope.current_page).to.equal(scope.pages - 2);
    });
    it('should change sort correctly', function () {
        scope.current_sort = "asc";
        scope.current_sorted_column = 0;

        scope.columnSort(1);
        expect(scope.current_sort).to.equal("asc");
        expect(scope.current_sorted_column).to.equal(1);
        scope.columnSort(1);
        expect(scope.current_sort).to.equal("desc");

    });

    it('should calculate the correct range', function () {
        scope.pages = 3;
        var result = scope.range();
        expect(result.length).to.equal(3);
        scope.pages = 10;
         result = scope.range();
        expect(result.length).to.equal(9);
        scope.pages = 20;
        scope.current_page=8;
        result = scope.range();
        expect(result.length).to.equal(9);
        expect(result[0]).to.equal(5);
        expect(result[8]).to.equal(13);
        scope.current_page=19;
        result = scope.range();
        expect(result.length).to.equal(9);
        expect(result[0]).to.equal(11);
        expect(result[8]).to.equal(19);

    });

    

});