/**
 * File: Interceptors;
 * Module: modulo di appartenenza;
 * Author: jack;
 * Created: 18/05/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History: tabella dei cambiamenti effettuati sul file.
 */

module.factory('myInterceptor', function($q, $location) {
    return function (promise) {
        return promise.then(
            // Success: just return the response
            function (response) {
                return response;
            },
            // Error: check the error status to get only the 401
            function (response) {
                if (response.status === 401)
                    $location.url('/login');
                return $q.reject(response);
            });
    }
}