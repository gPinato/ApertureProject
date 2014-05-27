/**
 * File: index.js
 * Module: maap_project
 * Author: Alberto Garbui
 * Created: 15/05/14
 * Version: 0.1
 * Description: avvio del progetto
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
'use strict';

var maaperture = require("maaperture")
  , config
  , config_file = './config_' + (process.env.NODE_ENV ? process.env.NODE_ENV : 'development') + '.js';

try {
  config = require(config_file);
} catch (err) {
  if (err.code && err.code === 'MODULE_NOT_FOUND') {
    console.error('No config file matching NODE_ENV=' + process.env.NODE_ENV 
      + '. Maaperture requires "' + __dirname + '/' + process.env.NODE_ENV + '.js"');
    process.exit(1);
  } else {
    throw err;
  }  
}

maaperture.start(config);
