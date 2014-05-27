/**
 * File: index.js
 * Module: maaperture
 * Author: Alberto Garbui
 * Created: 02/05/14
 * Version: 0.1
 * Description: avvio del server
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

var server = require('./maap_server');
exports.start = server.start;