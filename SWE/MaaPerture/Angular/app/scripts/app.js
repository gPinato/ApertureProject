'use strict';
/*
 * Moduli di angular da caricare per far girare il tutto
 */

angular.module('services', [ "ngResource"] );

angular
    .module('maaperture', [
        'ngCookies',
        'services',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ngRoute',
        'ui.sortable',
        'LocalStorageModule'
    ])
    .config(function ($routeProvider,$locationProvider,$provide,$httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/dashboard.html',
                controller: 'MainCtrl'
            })
            .when('/collection/:col_id', {
                templateUrl: 'views/collection.html',
                controller: 'CollectionCtrl'
            })
            .when('/collection/:col_id/:doc_id', {
                templateUrl: 'views/document.html',
                controller: 'DocumentCtrl'
            })
            .when('/collection/:col_id/:doc_id/edit', {
                templateUrl: 'views/documentEdit.html',
                controller: 'DocumentEditCtrl'
            })
            .when('/profile', {
                templateUrl: 'views/documentEdit.html',
                controller: 'DocumentEditCtrl'
            })
            .when('/profile/edit', {
                templateUrl: 'views/documentEdit.html',
                controller: 'DocumentEditCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/logout', {
                templateUrl: 'views/logout.html',
                controller: 'DocumentEditCtrl'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterCtrl'
            })


            .otherwise({
                redirectTo: '/404.html'
            });



        $locationProvider.html5Mode(true);
        //Force user to log

        $httpProvider.responseInterceptors.push(function($q, $location) {
            return function(promise) {
                return promise.then(
                    // Success: just return the response
                    function(response){ return response; },
                    // Error: check the error status to get only the 401
                    function(response) {
                        if (response.status === 401)
                            $location.url('/login');
                        return $q.reject(response);
                    }
                );
            }
        });
    })

    /*
     * Preffiso di locasStorage impostato su ls per evitare interferenze
     */
    .config(['localStorageServiceProvider', function(localStorageServiceProvider){
        localStorageServiceProvider.setPrefix('ls');
    }]);



