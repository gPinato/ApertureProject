/**
 * File: UsersCtrl_test;
 * Module: test;
 * Author: Mattia Sorgato;
 * Created: 10/05/14;
 * Version: 1.0.0;
 * Description: descrizione dettagliata del file;
 * Modification History: tabella dei cambiamenti effettuati sul file.
 */
'use strict';

describe('UsersCtrl', function () {


    var scope, routeParams, UsersCtrl;
    var $httpBackend;

    var data = { label: [ 'Email', 'Level' ],
        data: { email: 'bb@bb.com', level: 'administrator' } };

    beforeEach(module('maaperture', 'services', 'ngResource', 'ngRoute'));

    beforeEach(angular.mock.inject(function ($rootScope, $routeParams,$location, $controller, _$httpBackend_) {
        scope = $rootScope.$new();
        routeParams = $routeParams;
        $httpBackend = _$httpBackend_;
        routeParams.user_id = 1

        UsersCtrl = $controller('UsersCtrl', {
            '$scope': scope,
            '$routeParams': routeParams,
            'location': $location
        });
    }));

    it('should set some data on the scope when successful', function () {
        // Given
        $httpBackend.whenGET('http://localhost:9000/api/users/' + routeParams.user_id).respond(200, data);

        // When
        //scope.loadData();
        $httpBackend.flush();
        // Then
        expect(scope.data).toEqual(data.data);
        expect(scope.labels).toEqual(data.label);
        expect(scope.original_keys).toEqual(["email","level"]);
        expect(scope.original_data).toEqual(['bb@bb.com',"administrator"]);

    });

    it('should display an error when not successful', function () {
        // Given
        $httpBackend.whenGET('http://localhost:9000/api/users/' + routeParams.user_id).respond(400);
        // When
        //scope.loadData();
        $httpBackend.flush();
        // Then
        /*
        expect(location.path()).toBe('/404');

        spyOn(location, 'path');
        expect(location.path()).toHaveBeenCalledWith('/404');*/
    });
});