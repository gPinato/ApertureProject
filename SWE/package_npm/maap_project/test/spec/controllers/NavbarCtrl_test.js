/**
 * File: NavBarCtrl_test;
 * Module: modulo di appartenenza;
 * Author: jack;
 * Created: 10/05/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History: tabella dei cambiamenti effettuati sul file.
 */
'use strict';

describe('Controller: NavBarCtrl', function () {

    // load the controller's module
    beforeEach(module('maaperture', 'services', 'ngResource', 'ngRoute'));

    var MainCtrl,
        routeParams,
        scope,
        location,
        $httpBackend;
    var data ={label: [ 'Timestamp', 'Message', 'Level' ],
                data:['a','b','c']};

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller,$location, $rootScope, _$httpBackend_) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        location = $location;

        MainCtrl = $controller('NavBarCtrl', {
            $scope: scope,
            $routeParams:routeParams
        });

    }));

    it('should set some data on the scope when successful', function () {
        // Given
        $httpBackend.whenGET('http://localhost:9000/api/collection/list').respond(200, data);
        $httpBackend.whenGET('views/dashboard.html').respond(200);

        // When
        $httpBackend.flush();
        // Then
        expect(scope.labels).toEqual(data.labels);
        expect(scope.values).toEqual(data.data);
        //expect(scope.pages).toEqual(data[2]);

    });


    it('should delete a document correctly', function () {
        // Given
        $httpBackend.whenGET('http://localhost:9000/api/collection/list').respond(400);
        $httpBackend.whenGET('views/dashboard.html').respond(200);

        // When
        $httpBackend.flush();
        // Then
        expect(scope.labels).toBe(undefined);
        expect(scope.values).toBe(undefined);

    });

    it('should set some data on the scope when successful', function () {
        // Given
        $httpBackend.whenGET('http://localhost:9000/api/collection/list').respond(200, data);
        $httpBackend.whenGET('http://localhost:9000/api/logout').respond(200);
        $httpBackend.whenGET('views/dashboard.html').respond(200);

        // When
        $httpBackend.flush();
        // Then


    });


    it('should delete a document correctly', function () {
        // Given
        $httpBackend.whenGET('http://localhost:9000/api/collection/list').respond(200, data);

        $httpBackend.whenGET('http://localhost:9000/api/logout').respond(400);
        $httpBackend.whenGET('views/dashboard.html').respond(200);

        // When
        $httpBackend.flush();
        // Then


    });
});
