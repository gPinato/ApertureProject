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
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

    /*
     * Preffiso di locasStorage impostato su ls per evitare interferenze
     */
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
        localStorageServiceProvider.setPrefix('ls');
   }]);
    /*
     * todos in localstore per non perderli nel refresh della pagina
     */
/*
    .controller('MainCtrl', function ($scope,  localStorageService) {
        var todosInStore = localStorageService.get('todos');

        $scope.todos = todosInStore && todosInStore.split('\n') || [];

        $scope.$watch('todos', function () {
            localStorageService.add('todos', $scope.todos.join('\n'));
        }, true);
        $scope.addTodo = function () {
            $scope.todos.push($scope.
            $scope.
        };
    });*/
