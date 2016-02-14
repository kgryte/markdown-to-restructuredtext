'use strict';

var path = require( 'path' );
var md2rst = require( './../lib' );

var inFile = path.resolve( __dirname, '../README.md' );
var outFile = './examples/README.rst';

var opts = {
	'flavor': 'github'
};
md2rst( inFile, outFile, opts, done );

function done( error ) {
	if ( error ) {
		throw error;
	}
	console.log( 'Input file: %s', inFile );
	console.log( 'Output file: %s', outFile );
}
