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

describe('Controller: PwdRecoveryCtrl', function () {

    // load the controller's module
    beforeEach(module('maaperture', 'services', 'ngResource','ngCookies', 'ngRoute'));

    var MainCtrl,
        routeParams,
        $httpBackend,
        scope,
        cookieStore,
        credentials;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope,_$httpBackend_,$cookieStore ) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        cookieStore = $cookieStore,
            credentials = {
                email: '1'
            };

        MainCtrl = $controller('PwdRecoveryCtrl', {
            $scope: scope,
            $routeParams:routeParams,
            $cookieStore:cookieStore
        });
    }));

    it('should register an user correclty', function () {
        // Given
        $httpBackend.whenGET('views/dashboard.html').respond(200);

        $httpBackend.whenPOST('http://localhost:9000/api/forgot').respond(200);

        // When
        scope.recover();
        $httpBackend.flush();
        // Then


    });

    it('should give an error when not succesfull', function () {
        // Given

        $httpBackend.whenPOST('http://localhost:9000/api/forgot').respond(400);
        $httpBackend.whenGET('views/dashboard.html').respond(200);
        $httpBackend.whenGET('views/pwdrecovery.html').respond(200);


        // When
        scope.recover();
        $httpBackend.flush();
        // Then


    });


});

