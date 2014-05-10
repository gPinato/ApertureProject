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
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('CollectionCtrl', {
            $scope: scope
        });
    }));

    it('should load data from the services', function () {
        expect(scope.rows.length).to.not.equal(0);
    });/*
    it('should be in the correct place', function () {
        expect(location.path()).toEqual('/collection');
    });*/

});