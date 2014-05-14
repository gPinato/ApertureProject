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
            .when('/userprofiles', {
                templateUrl: 'views/documentEdit.html',
                controller: 'DocumentEditCtrl'
            })
            .when('/userprofiles/:prof_id', {
                templateUrl: 'views/documentEdit.html',
                controller: 'DocumentEditCtrl'
            })
            .when('/userprofiles/:prof_id/edit', {
                templateUrl: 'views/documentEdit.html',
                controller: 'DocumentEditCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'DocumentEditCtrl'
            })
            .when('/logout', {
                templateUrl: 'views/logout.html',
                controller: 'DocumentEditCtrl'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'DocumentEditCtrl'
            })


            .otherwise({
                redirectTo: '/404.html'
            });


        $locationProvider.html5Mode(true);
    })

    /*
     * Preffiso di locasStorage impostato su ls per evitare interferenze
     */
    .config(['localStorageServiceProvider', function(localStorageServiceProvider){
        localStorageServiceProvider.setPrefix('ls');
    }]);

