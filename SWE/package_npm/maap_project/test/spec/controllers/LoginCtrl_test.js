/**
 * File: LoginCtrl_test;
 * Module: modulo di appartenenza;
 * Author: Giacomo Pinato;
 * Created: 18/05/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 file creation
 ==============================================
 */


'use strict';

describe('Controller: LoginCtrl', function () {

    // load the controller's module
    beforeEach(module('maaperture'));

    var MainCtrl,
        MockServer,
        scope;

    // Initialize the controller and a mock server
    beforeEach(inject(function ($controller, $rootScope ) {
        scope = $rootScope.$new();
        MockServer = {
            post:function(email, password) {
                if (email.valueOf() === 'apertureswe@gmail.com' &&
                    password.valueOf() === 'asdasd')
                    return  true;
                else
                    return  false;
            }
        };



        MainCtrl = $controller('LoginCtrl', {
            $scope: scope,
            AuthService : MockServer
        });
    }));

    it('credentials should be empity', function(){
        expect(scope.credentials).toEqual({email: '',
            password: ''});
    });

    it('should log in the correct user', function(){
        scope.credentials = {
            email: 'apertureswe@gmail.com',
            password: 'asdasd'
        };
        //expect(scope.login()).toBe(true);

        });

});

