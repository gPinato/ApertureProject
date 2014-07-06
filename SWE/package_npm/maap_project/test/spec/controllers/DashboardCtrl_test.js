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

describe('DashboardCtrl', function () {
    var mockUserResource,
        $httpBackend,
        scope;
    beforeEach(angular.mock.module('maaperture'));

    beforeEach(function () {
        angular.mock.inject(function ($injector, $controller, $rootScope) {
            $httpBackend = $injector.get('$httpBackend');
            mockUserResource = $injector.get('CollectionListService');
            scope = $rootScope.$new();
        })
    });

    describe('get the right list', function () {
        it('should call getUser with username', inject(function () {
            $httpBackend.expectGET('http://localhost:9000/api/collection/list')
                .respond({labels:['a','b','c'],
                          values: [1,2,3]});

            var result = mockUserResource.get();

            $httpBackend.flush();

            expect(result.labels[0]).to.equal('a');
            expect(result.values[1]).to.equal(2);
        }));

    });
});