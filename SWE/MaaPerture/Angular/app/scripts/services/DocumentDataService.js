/**
 * File: DocumentDataService;
 * Module: modulo di appartenenza;
 * Author: jack;
 * Created: 12/05/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History: tabella dei cambiamenti effettuati sul file.
 */

angular.module('services')
    .factory('DocumentDataService',['$resource',function($resource){
        return $resource ('http://localhost:8080/api/collection/:col_id/:doc_id',
            {col_id : '@col_id', doc_id:'@doc_id'},
            {'query': {method:'GET'},
             'update': {method:'PUT'},
             'remove': {method:'DELETE'}});

        /*
         labels = ["Name", "Email", "Created at"];
         rows= [
         {"ID":0,"data":{"customer": "Gianni",  "email": "gianni@definitelynotgoogle.com","date":"15/12/2010"}},
         {"ID":1,"data":{"customer": "Pinotto",  "email": "Piotto@definitelynotgoogle.com","date":"10/12/2010"}},
         {"ID":2,"data":{"customer": "Bonnie",  "email": "Bonnie@unicredit.com","date":"10/11/2010"}},
         {"ID":3,"data":{"customer": "Clyde",  "email": "Clyde@unicredit.com","date":"12/12/2010"}}
         ];
         */


    }]);


/*
* var derp = ["Name","Address","Sex", "Email", "Created at","I Lack fantasy"];
 var document= [{"ID":0,"data":{"customer": "Gianni Smartface",
 "Address":"Via dei Fagiani 22, Fagianopoli",
 "Sex":"never",
 "email": "gianni@definitelynotgoogle.com",
 "date":"15/12/2015",
 "Something":"something else"}},
 {"ID":1,"data":{"customer": "Pinotto Turkleton",
 "Address":"Via dei Fagiani 21, Fagianopoli",
 "Sex":"never",
 "email": "pinotto@definitelynotgoogle.com",
 "date":"15/12/2005",
 "Something":"something else"}}];*/