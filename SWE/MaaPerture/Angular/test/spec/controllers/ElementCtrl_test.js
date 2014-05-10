/**
 * File: ElementCtrl_test;
 * Module: modulo di appartenenza;
 * Author: jack;
 * Created: 10/05/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History: tabella dei cambiamenti effettuati sul file.
 */
'use strict';

describe('Controller: ElementCtrl', function () {

    // load the controller's module
    beforeEach(module('maaperture'));

    var MainCtrl,
        routeParams,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope ) {
        scope = $rootScope.$new();
        routeParams ={};
        routeParams.id=2;
        MainCtrl = $controller('ElementCtrl', {
            $scope: scope,
            $routeParams:routeParams
        });
    }));

    it('should load data from the services', function () {
        expect(scope.rows.length).to.not.equal(0);
    });

    it('should extract an element', function () {
        expect(scope.rows[0].id).to.equal(0);
        expect(scope.rows[0].sender).to.equal('jean@somecompany.com');
    });
    it('should extract the right element', function () {

        expect(scope.element.id).to.equal(2);
        expect(scope.element.sender).to.equal('bill@somecompany.com');
    });


});