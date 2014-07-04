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

describe('UsersCtrl', function () {

    beforeEach(angular.mock.module('maaperture'));

    var MainCtrl,
        routeParams,
        scope;

    beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
        scope = $rootScope.$new();
        routeParams ={};
        routeParams.user_id=0;




        MainCtrl = $controller('UsersCtrl', {
            $scope: scope,
            $routeParams:routeParams
        });

    }));

    describe('get the right list', function () {
        it('should initialize data correctly', function () {
            expect(scope.original_data.length).to.equal(0);
            expect(scope.original_keys.length).to.equal(0);
            expect(scope.current_document).to.equal(0);

        });

    });
});