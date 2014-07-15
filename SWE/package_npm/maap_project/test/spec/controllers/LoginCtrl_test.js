/**
 * File: LoginCtrl_test;
 * Module: modulo di appartenenza;
 * Author: Giacomo Pinato;
 * Created: 18/05/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 file creation
 ==============================================
 */


'use strict';

describe('Controller: LoginCtrl', function () {

    // load the controller's module
    beforeEach(module('maaperture', 'services', 'ngResource','ngCookies', 'ngRoute'));

    var MainCtrl,
        routeParams,
        $httpBackend,
        scope,
        cookieStore,
        data;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope,_$httpBackend_,$cookieStore ) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        cookieStore = $cookieStore,
        data ={};
        data.level=1;

        MainCtrl = $controller('LoginCtrl', {
            $scope: scope,
            $routeParams:routeParams,
            $cookieStore:cookieStore
        });
    }));

    it('should set user data correctly when successful (admin)', function () {
        // Given

        $httpBackend.whenGET('http://localhost:9000/api/login').respond(200, data);
        $httpBackend.whenGET('views/dashboard.html').respond(200);

        // When
        $httpBackend.flush();
        // Then
        var temp = cookieStore.get("isAdmin");
        expect(temp).toBe(true);

    });

    it('should set user data correctly when successful (user)', function () {
        // Given
        data.level=0;
        $httpBackend.whenGET('http://localhost:9000/api/login').respond(200, data);
        $httpBackend.whenGET('views/dashboard.html').respond(200);

        // When
        $httpBackend.flush();
        // Then
        var temp = cookieStore.get("isAdmin");
        expect(temp).toBe(false);

    });

    it('should set user data correctly when successful (user)', function () {
        // Given
        data.level=0;
        $httpBackend.whenGET('http://localhost:9000/api/login').respond(400);
        $httpBackend.whenGET('views/dashboard.html').respond(200);

        // When
        $httpBackend.flush();
        // Then


    });
});

