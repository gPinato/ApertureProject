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

describe('Controller: ProfileEditCtrl', function () {

    // load the controller's module
    beforeEach(module('maaperture', 'services', 'ngResource', 'ngRoute'));

    var MainCtrl,
        routeParams,
        $httpBackend,
        scope,
        data = { label: [ '_id', 'Timestamp', 'Message' ],
            data:
            {   timestamp: 'today',
                message: 'AMAIL',
                level: 'info' } };
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope,_$httpBackend_ ) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;

        routeParams ={};
        routeParams.col_id=0;
        routeParams.doc_id=0;

        MainCtrl = $controller('ProfileEditCtrl', {
            $scope: scope,
            $routeParams:routeParams
        });
    }));

    it('should set some data on the scope when successful', function () {
        // Given
        $httpBackend.whenGET('http://localhost:9000/api/profile/edit').respond(200, data);

        // When
        $httpBackend.flush();
        // Then
        var temp = JSON.stringify(data, undefined, 2);
        expect(scope.original_data).toEqual(temp);

    });

    it('should display an error when not successful', function () {
        // Given
        $httpBackend.whenGET('http://localhost:9000/api/profile/edit').respond(400);

        // When
        //scope.loadData();
        $httpBackend.flush();
        // Then

    });

    it('should delete a document correctly', function () {
        // Given
        $httpBackend.whenGET('http://localhost:9000/api/profile/edit').respond(200,data);
        $httpBackend.whenDELETE('http://localhost:9000/api/profile/edit').respond(200);

        // When
        scope.delete_document();
        $httpBackend.flush();
        // Then
        //test sul path

    });

    it('should display an error when the delete fails', function () {
        // Given
        $httpBackend.whenGET('http://localhost:9000/api/profile/edit').respond(400);
        $httpBackend.whenDELETE('http://localhost:9000/api/profile/edit').respond(200);

        // When
        scope.delete_document();
        $httpBackend.flush();
        // Then


    });
});
