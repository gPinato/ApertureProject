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
        scope,
        mockResource;

    beforeEach(inject(function ($controller, $rootScope, $resource, $q) {
        scope = $rootScope.$new();
        routeParams ={};
        routeParams.user_id=0;
        mockResource = function (prop) {
            for(var k in properties)
                this[k]=properties[k];
        };
        mockResource.query = function(){
            var deferred = $q.defer();
            deferred.resolve({ labels: ['labelOne', 'labelTwo'], data: {'key':'value', 'keyTwo':'two'}});
        return deferred.promise;
    };
        MainCtrl = $controller('UsersCtrl', {
            $scope: scope,
            $routeParams:routeParams,
            UserDataService:mockResource
        });

    describe('get a User', function() {
        it('should get a User', function () {
            mockResource.query(
                {
                    user_id: routeParams.user_id
                },
                function success(data) {
                    scope.labels = data.labels;
                    console.log("successo");
                },
                function error(err) {
                    console.log("errore");
                }
            );
            console.log(scope.labels);
            expect(scope.labels.length).toBe(2);
        });
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