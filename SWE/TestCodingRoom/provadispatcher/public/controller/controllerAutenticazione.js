var MaaP = angular.module('MaaP', []);

function controllerAutenticazione($scope, $http) {
	
	$scope.datiVari = {};
	
	//creo una funzione d'esempio per inviare datiVari tramite post
	$scope.inviaRequestPOST = function() {
		$http.post('/testRequestPOST', $scope.datiVari)
			.success(function(data) {  //se la richiesta avviene con successo scrivo
				$scope.reqResult = "richiesta POST inviata correttamente";
				$scope.datiVari = data;	//metto il risultato sullo scope
			})
			.error(function(data) {
				console.log('Error: ' + data);
				$scope.reqResult = "problemi con l'invio della richiesta POST";
			});
	};
	
	//stessa cosa però richiesta get
	$scope.inviaRequestGET1 = function() {
		$http.get('/testRequestGET')
			.success(function(data) {
				$scope.reqResult = "richiesta GET inviata correttamente";
				$scope.datiVari = data; //metto il risultato sull scope
			})		
			.error(function(data) {
				console.log('Error: ' + data);
				$scope.reqResult = "problemi con l'invio della richiesta GET";
			});
	};
	
	$scope.inviaRequestGET2 = function() {
		$http.get('/JK')
			.success(function(data) {
				$scope.reqResult = "richiesta GET inviata correttamente";
				$scope.datiVari = data; //metto il risultato sull scope
			})		
			.error(function(data) {
				console.log('Error: ' + data);
				$scope.reqResult = "problemi con l'invio della richiesta GET";
			});
	};
	
	$scope.inviaRequestGET3 = function() {
		$http.get('/pippo')
			.success(function(data) {
				$scope.reqResult = "richiesta GET inviata correttamente";
				$scope.datiVari = data; //metto il risultato sull scope
			})		
			.error(function(data) {
				console.log('Error: ' + data);
				$scope.reqResult = "problemi con l'invio della richiesta GET";
			});
	};

}