'use strict';

var path = require( 'path' );
var md2rst = require( './../../lib' ).sync;

var inFile = path.resolve( __dirname, '../../README.md' );
var outFile = path.join( __dirname, './README.rst' );

var opts = {
	'flavor': 'github'
};

var rst = md2rst( inFile, opts );
console.log( rst );

md2rst( outFile, inFile, opts );
