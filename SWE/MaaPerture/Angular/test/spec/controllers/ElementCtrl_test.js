/**
 * File: ElementCtrl_test;
 * Module: modulo di appartenenza;
 * Author: Giacomo pinato;
 * Created: 10/05/14;
 * Version: 0.5;
 * Description: Test del controller per la visualizzazione dei singoli elementi;
 * Modification History: tabella dei cambiamenti effettuati sul file.
 */
'use strict';

describe('Controller: DocumentCtrl', function () {

    // load the controller's module
    beforeEach(module('maaperture'));

    var MainCtrl,
        routeParams,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope ) {
        scope = $rootScope.$new();
        routeParams ={};
        routeParams.col_id=0;
        routeParams.doc_id=0;
        MainCtrl = $controller('DocumentCtrl', {
            $scope: scope,
            $routeParams:routeParams
        });
    }));

    it('should load data from the services', function () {
        expect(scope.document.length).to.not.equal(0);
    });

    it('should extract an element', function () {
        expect(scope.document.ID).to.equal(routeParams.doc_id);
        expect(scope.document.data.customer).to.equal('Gianni Smartface');
    });
    it('should extract the right element', function () {

        expect(scope.element.ID).to.equal(2);
        expect(scope.element.customer).to.equal('Bonnie');
        expect(scope.element.orders[0].product_name).to.equal('Y-women VHS');

    });


});