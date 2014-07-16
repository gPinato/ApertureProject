/**
 * File: DocumentEditCtrl_test;
 * Module: modulo di appartenenza;
 * Author: jack;
 * Created: 16/05/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History: tabella dei cambiamenti effettuati sul file.
 */

'use strict';

describe('Controller: DocumentEditCtrl', function () {

    // load the controller's module
    beforeEach(module('maaperture', 'services', 'ngResource', 'ngRoute'));

    var MainCtrl,
        routeParams,
        $httpBackend,
        scope,
        data = { _id: 'WM',
            name: 'Walter',
            surname: 'Mazzarri',
            email: 'walter@mazzarri.com',
            age: 45 }
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope,_$httpBackend_ ) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;

        routeParams ={};
        routeParams.col_id=0;
        routeParams.doc_id=0;

        MainCtrl = $controller('DocumentEditCtrl', {
            $scope: scope,
            $routeParams:routeParams
        });
    }));

    it('should set some data on the scope when successful', function () {
        // Given
        $httpBackend.whenGET('http://localhost:9000/api/collection/0/0/edit').respond(200, data);

        // When
        $httpBackend.flush();
        // Then


        var temp = JSON.stringify({
            "_id": "WM",
            "name": "Walter",
            "surname": "Mazzarri",
            "email": "walter@mazzarri.com",
            "age": 45,
            "$promise": {},
            "$resolved": true
        }, undefined, 2)

        expect(scope.original_data).toEqual(temp);

    });

    it('should display an error when not successful', function () {
        // Given
        $httpBackend.whenGET('http://localhost:9000/api/collection/0/0/edit').respond(400);

        // When
        //scope.loadData();
        $httpBackend.flush();
        // Then

    });

    it('should delete a document correctly', function () {
        // Given
        $httpBackend.whenGET('http://localhost:9000/api/collection/0/0/edit').respond(200,data);
        $httpBackend.whenDELETE('http://localhost:9000/api/collection/0/0/edit').respond(200);

        // When
        scope.delete_document();
        $httpBackend.flush();
        // Then
        //test sul path

    });

    it('should display an error when the delete fails', function () {
        // Given
        $httpBackend.whenGET('http://localhost:9000/api/collection/0/0/edit').respond(400);
        $httpBackend.whenDELETE('http://localhost:9000/api/collection/0/0/edit').respond(200);

        // When
        scope.delete_document();
        $httpBackend.flush();
        // Then


    });
});
