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
    .factory('DocumentDataService',function(){

        var derp = ["Name","Address","Sex", "Email", "Created at","I Lack fantasy"];
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
                "Something":"something else"}}];

        return {
            getDocument: function () {
                return document;
            }


        }


    });