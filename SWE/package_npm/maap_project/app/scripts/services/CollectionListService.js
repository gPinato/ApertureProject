/**
 * File: CollectionListService;
 * Module: modulo di appartenenza;
 * Author: jack;
 * Created: 01/06/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
angular.module('services')
    .factory('CollectionListService',['$resource',function($resource){
        return $resource ('http://localhost:9000/api/collection/list');

    }]);

