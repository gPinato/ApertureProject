/**
 * File: CollectionDataService;
 * Module: modulo di appartenenza;
 * Author: jack;
 * Created: 09/05/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History: tabella dei cambiamenti effettuati sul file.
 */

var temp = angular.module('maaperture.services',
    ['ngResource']);


temp.factory('CollectionDataService',function(){
    var rows= [
            {"ID":0, "customer": "Gianni",  "email": "gianni@definitelynotgoogle.com"},
            {"ID":1, "customer": "Pinotto",  "email": "Piotto@definitelynotgoogle.com"},
            {"ID":2, "customer": "Bonnie",  "email": "Bonny@unicredit.com"},
            {"ID":3, "customer": "Clyde",  "email": "Clyde@unicredit.com"}
        ];

    return {
        getProperty: function () {
            return rows;
        }}


});