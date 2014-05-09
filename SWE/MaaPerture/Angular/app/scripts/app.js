'use strict';
/*
 * Moduli di angular da caricare per far girare il tutto
 */
angular
    .module('angularyoApp', [
        'ngCookies',
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
                controller: 'MainCtrl'
            })
            .when('/collection', {
                templateUrl: 'views/collection.html',
                controller: 'ControllerColl'
            })
            .when('/view/:id', {
                templateUrl: 'views/detail.html',
                controller: 'detail'
            })
            .otherwise({
                redirectTo: '/'
            });


         $provide.factory('firstservice', function() {
         var rows= [{
         id: 0, sender: 'jean@somecompany.com', subject: 'Hi there, old friend',
         date: 'Dec 7, 2013 12:32:00', recipients: ['greg@somecompany.com'],
         message: 'Hey, we should get together for lunch sometime and catch up.'
         +'There are many things we should collaborate on this year.'
         }, {
         id: 1, sender: 'maria@somecompany.com',
         subject: 'Where did you leave my laptop?',
         date: 'Dec 7, 2013 8:15:12', recipients: ['greg@somecompany.com'],
         message: 'I thought you were going to put it in my desk drawer.'
         +'But it does not seem to be there.'
         }, {
         id: 2, sender: 'bill@somecompany.com', subject: 'Lost python',
         date: 'Dec 6, 2013 20:35:02', recipients: ['greg@somecompany.com'],
         message: "Nobody panic, but my pet python is missing from her cage.She doesn't move too fast, so just call me if you see her."
         } ];

         return {
         getProperty: function () {
         return rows;
         },
         setProperty: function(value) {
         property = value;
         }
         }});
        $locationProvider.html5Mode(true);
    })

    /*
     * Preffiso di locasStorage impostato su ls per evitare interferenze
     */
    .config(['localStorageServiceProvider', function(localStorageServiceProvider){
        localStorageServiceProvider.setPrefix('ls');
    }]);

