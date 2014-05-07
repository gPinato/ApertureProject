function ShoppingController($scope, $http) {
    $http.get('http://localhost:8080/req').success(function(data) {
        $scope.items = data;
    })};