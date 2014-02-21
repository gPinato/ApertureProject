var MaaP = angular.module('MaaP', []);

function mainController($scope, $http) {
	
	$scope.formData = {};

	$scope.datiVari = {};
	
	// when landing on the page, get all todos and show them
	$http.get('/api/docs')
		.success(function(data) {
			$scope.collection = data;
		})		
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createDoc = function() {
		$http.post('/api/addDoc', $scope.formData)
			.success(function(data) {
				$('input').val('');
				$scope.collection = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
	

	// delete a todo after checking it
	$scope.deleteDoc = function(id) {
		$http.delete('/api/docs/' + id)
			.success(function(data) {
				$scope.collection = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}

function secondController($scope, $http) {
		
	$scope.testButton = function() {
		$http.get('/api/docs')
			.success(function(data) {
				$scope.campoTest = data;
			})		
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}