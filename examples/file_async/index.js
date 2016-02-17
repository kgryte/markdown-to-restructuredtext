'use strict';

var path = require( 'path' );
var md2rst = require( './../../lib' );

var inFile = path.resolve( __dirname, '../../README.md' );
var outFile = path.join( __dirname, './README.rst' );

var opts = {
	'flavor': 'github'
};

md2rst( inFile, opts, onResults );

function onResults( error, rst ) {
	if ( error ) {
		throw error;
	}
	console.log( rst );
}

md2rst( outFile, inFile, opts, onFile );

function onFile( error ) {
	if ( error ) {
		throw error;
	}
	console.log( 'Input file: %s', inFile );
	console.log( 'Output file: %s', outFile );
}
