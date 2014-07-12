/**
 * File: UsersCtrl_test;
 * Module: test;
 * Author: jack;
 * Created: 10/05/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History: tabella dei cambiamenti effettuati sul file.
 */
'use strict';

ddescribe('UsersCtrl - Mattia Version', function () {

	var scope, location, fakeDataService, fakeEditService, routeParams, UsersCtrl;
    var getDeferred;
    var data={label:["a","b"]};
    beforeEach(function() {
		module('maaperture');
	});

	beforeEach(angular.mock.inject(function( $rootScope, $location, $routeParams, $controller, $q) {
		scope = $rootScope.$new();
		location = $location;
		routeParams = $routeParams;
		fakeDataService = {
			query: function() {return $http().then();}
		};

        getDeferred = $q.defer();
        getDeferred.resolve(data);

        spyOn(fakeDataService, 'query').andReturn(getDeferred);


        UsersCtrl = $controller('UsersCtrl', {
			'$scope': scope,
			'$location': location,
			'UserDataService': fakeDataService,
			'UserEditService': fakeEditService,
			'$routeParams': routeParams
		});
	}));

    it('should call stuff', function () {
        expect(fakeDataService.query).toHaveBeenCalled();
    });

    it('should set some data on the scope when successful', function () {
        scope.loadData();
        scope.$apply();
        scope.$digest();
        expect(fakeDataService.get).toHaveBeenCalled();
        expect(scope.data).toEqual(getResponse.data);
    });

    it('should do something else when unsuccessful', function () {
        getDeferred.reject(data);
        scope.loadData();
        scope.$apply();
        expect(fakeDataService.get).toHaveBeenCalled();
        expect(scope.error).toEqual('ERROR');
    });


});