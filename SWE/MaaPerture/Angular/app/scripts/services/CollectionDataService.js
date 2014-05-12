/**
 * File: CollectionDataService;
 * Module: modulo di appartenenza;
 * Author: jack;
 * Created: 09/05/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History: tabella dei cambiamenti effettuati sul file.
 */
angular.module('services')
    .factory('CollectionDataService',function(){

    var labels = ["Name", "Email", "Created at"];
    var rows= [
            {"ID":0,"data":{"customer": "Gianni",  "email": "gianni@definitelynotgoogle.com","date":"15/12/2010"}},
            {"ID":1,"data":{"customer": "Pinotto",  "email": "Piotto@definitelynotgoogle.com","date":"10/12/2010"}},
            {"ID":2,"data":{"customer": "Bonnie",  "email": "Bonnie@unicredit.com","date":"10/11/2010"}},
            {"ID":3,"data":{"customer": "Clyde",  "email": "Clyde@unicredit.com","date":"12/12/2010"}}
            ];

    return {
        getProperty: function () {
            return rows;
        },

        getLabels: function(){
            return labels;
        }
    }


});