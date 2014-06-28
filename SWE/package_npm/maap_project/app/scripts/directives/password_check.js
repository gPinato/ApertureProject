/**
 * File: password_check;
 * Module: modulo di appartenenza;
 * Author: jack;
 * Created: 20/05/14;
 * Version: versione corrente;
 * Description: descrizione dettagliata del file;
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 *
 ==============================================
 */
'use strict';
/*
* Controlla se le due password inserite nel form di registrazione sono identiche.
* Se non lo sono invalida il form e non si può fare la registrazione.
* */
angular.module('maaperture').
    directive('pwCheck', [function () {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                var firstPassword = '#' + attrs.pwCheck;
                elem.add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        var v = elem.val() === $(firstPassword).val();
                        ctrl.$setValidity('pwmatch', v);
                    });
                });
            }
        }
    }]);