'use strict';

var path = require( 'path' );
var readFile = require( 'utils-fs-read-file' ).sync;
var md2rst = require( './../../lib' ).fromString;

var data = readFile( path.resolve( __dirname, '../../README.md' ), {'encoding':'utf8'} );
var outFile = path.join( __dirname, './README.rst' );

var opts = {
	'flavor': 'github'
};

md2rst( data, opts, onResults );

function onResults( error, rst ) {
	if ( error ) {
		throw error;
	}
	console.log( rst );
}

md2rst( outFile, data, opts, onFile );

function onFile( error ) {
	if ( error ) {
		throw error;
	}
	console.log( 'Output file: %s', outFile );
}
