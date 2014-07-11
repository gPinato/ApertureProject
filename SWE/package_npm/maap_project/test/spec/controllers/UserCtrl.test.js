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

	var scope, location, fakeDataService, fakeEditService, routeParams, UsersCtrl, deferred;

	beforeEach(function() {
		module('maaperture');
	});

	beforeEach(angular.mock.inject(function($rootScope, $location, $routeParams, $controller, $q) {
		scope = $rootScope.$new();
		location = $location;
		routeParams = $routeParams;
		fakeDataService = {
			query: function() {
				deferred = $q.defer();
				deferred.resolve({'label': ['one', 'two', 'three'], 'data': {'cosa': 'cose', 'roba': 'robe'}});
				return deferred.promise;
			}
		};
		spyOn(fakeDataService, 'query').andCallThrough();
		fakeEditService = jasmine.createSpy('UserEditService');
		fakeEditService.query = function() {
			return {'roba': 'altra roba'};
		};
		UsersCtrl = $controller('UsersCtrl', {
			'$scope': scope,
			'$location': location,
			'UserDataService': fakeDataService,
			'UserEditService': fakeEditService,
			'$routeParams': routeParams
		});
	}));

	it('should initialise the scope properly', function() {
		expect(scope).toBeDefined();
	});

	it('should fetch the data from the fake service', function() {
		scope.$apply();
		expect(fakeDataService.query).toHaveBeenCalled();
	});

});