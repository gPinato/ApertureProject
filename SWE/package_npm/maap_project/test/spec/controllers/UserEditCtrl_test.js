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

describe('Controller: UsersEditCtrl', function () {

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
        routeParams ={};
        routeParams.user_id=0;

        MainCtrl = $controller('UsersEditCtrl', {
            $scope: scope,
            $routeParams:routeParams
        });

    }));

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            mockBackend = $injector.get('$httpBackend');
        });
    });


    it('should initialize data correctly', function () {
        expect(scope.newPassword1).toBe(null);
        expect(scope.newPassowrd2).toBe(null);
        expect(scope.original_data.length).toBe(0);
        expect(scope.original_keys.length).toBe(0);
        expect(scope.admin).toBe(true);
    });



});