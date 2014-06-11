/**
 * File: NavBarCtrl;
 * Module: modulo di appartenenza;
 * Author: jack;
 * Created: 01/06/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 *
 ==============================================
 */


angular.module('maaperture').controller('NavBarCtrl', function ($scope, CollectionListService ) {
    CollectionListService.get(
        function success(data) {
            $scope.labels = data.labels;
            $scope.values = data.data;
        });
    $scope.isAdmin=false;
    $scope.singup_enabled = true;
    $scope.isLoggedIn = function (){
        return false;
    };


});
