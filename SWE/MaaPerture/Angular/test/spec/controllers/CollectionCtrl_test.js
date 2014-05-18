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
        mockBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
        scope = $rootScope.$new();
        mockBackend = _$httpBackend_;
        routeParams ={};
        routeParams.col_id=0;
        routeParams.doc_id=0;

        MockColService = {
            query: function(value) {
                return {
                    "labels" : [
                        "Name",
                            "Email",
                            "Created at"
                        ],
                    "values" : {
                        "ID": 0,
                        "data": {
                            "customer": "Gina",
                            "email": "gina@pina.com",
                            "date": "15/12/2012"
                        }
                    }
                };
            }
        };

        //spyOn(MockColService, 'query').andCallThrough();
        MockCall = MockColService.query();

        MainCtrl = $controller('CollectionCtrl', {
            $scope: scope,
            $routeParams:routeParams,
            CollectionDataService : MockColService
        });
    }));



    it('should load data from the services', function () {
        expect(scope.data.length).to.not.equal(0);
    });
    it('should load labels from the services', function () {
        expect(scope.data.labels).to.not.equal(0);
        expect(scope.data.labels[0]).to.equal("Name");
    });
    it('should load rows from the services', function () {
        expect(scope.data.values).to.not.equal(0);
        expect(scope.data.values.data.customer).to.equal("Gina");

    });
    /*
    it('should be in the correct place', function () {
        expect(location.path()).toEqual('/collection');
    });*/

});