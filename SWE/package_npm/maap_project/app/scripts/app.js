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
    .config(function ($routeProvider,$locationProvider,$provide) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'CollectionCtrl'
            })
            .when('/collection', {
                templateUrl: 'views/collection.html',
                controller: 'CollectionCtrl'
            })
            .when('/view/:id', {
                templateUrl: 'views/document.html',
                controller: 'ElementCtrl'
            })
            .when('/element', {
                templateUrl: 'views/orders.html',
                controller: 'ElementCtrl'
            })
            .when('/orders', {
                templateUrl: 'views/orders.html',
                controller: 'ElementCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });


        $locationProvider.html5Mode(true);
    })

    /*
     * Preffiso di locasStorage impostato su ls per evitare interferenze
     */
    .config(['localStorageServiceProvider', function(localStorageServiceProvider){
        localStorageServiceProvider.setPrefix('ls');
    }]);

