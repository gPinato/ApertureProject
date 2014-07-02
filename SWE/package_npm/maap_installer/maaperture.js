#!/usr/bin/env node

/**
 * File: maaperture.js
 * Module: maap_installer
 * Author: Alberto Garbui
 * Created: 02/05/14
 * Version: 0.1
 * Description: maaperture installer
 * Modification History:
 ==============================================
 * Version | Changes
 ==============================================
 * 0.1 File creation
 ==============================================
 */
 
"use strict";

var fs = require('fs');
var program = require('commander');
var ncp = require('ncp').ncp;

var version = JSON.parse(fs.readFileSync(__dirname + '/../package.json', 'utf8')).version;
var name = "Maaperture v" + version;
var description = "MongoDB as an Admin Platform - Aperture Software";

function printHelpTitle() {
	console.log('');
	console.log('  --------------------------------------------------');
	console.log('   ' + name);
	console.log('');
	console.log('   ' + description);
	console.log('  --------------------------------------------------');
}

function setProjectName(destination, project_name) {
	var file = destination + '/package.json';
	var packagejson = JSON.parse(fs.readFileSync(file, 'utf8').toString());
	packagejson.name = project_name;
	packagejson.description = project_name + ' created with Maaperture!';
	fs.writeFile(file, JSON.stringify(packagejson, null, '\t'));
}

function initProject(project_name, output_path) {
	var source = __dirname + '/../maap_project';
	if(output_path.charAt(output_path.length-1)!='/'){
		output_path=output_path +'/';
	}
	var destination = output_path + project_name;
	var info = "JK rocks!";
	console.log('');
	console.log(name + " - " + description);
	console.log('');
	console.log('generating the new empty project ' + project_name + ' into ' + destination + '...');
	var options = 
    { 
        clobber: false, 				//avoid2write existing files (false)
        filter: function (src) {
            //console.log(JSON.stringify(src));
			//console.log(src);
			return true;
        }
    };
	ncp(source, destination, options, function(err) {
		if(err) {
			return console.error(err);
		}
		console.log('setting project\'s name...');
		setProjectName(destination, project_name);
		console.log('');
		console.log('well done!');
		console.log('');
		console.log('you are ready to install the dependencies and start the server');
		console.log('with: "cd ' + destination + ' && npm install && npm start"');
	});	
}

program
	.version(version)
	.usage('<command> [options]')
	.option('-N, --name <project_name>', 'specify the project\'s name')
	.option('-O, --output [output_path]', 'specify the output path [./]', './');
 
program
	.command('create')
	.description('create and initialize a new empty project')
	.action(function(){
		if(program.name){
			initProject(program.name, program.output);
		}else{
			printHelpTitle();
			program.help();
		}
	});
	
program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ maaperture create --name razorback -O c:/');
  console.log('    $ maaperture create -N razorback');
  console.log('');
});

program.unknownOption = function(){
	printHelpTitle();
	program.help();
}

program.on('*', function(){
	printHelpTitle();
	program.help();
});

program
	.parse(process.argv);
	
if (process.argv.length < 4) {
	printHelpTitle();
	program.help();
}
