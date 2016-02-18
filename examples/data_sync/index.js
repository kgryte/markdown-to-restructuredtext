'use strict';

var path = require( 'path' );
var readFile = require( 'utils-fs-read-file' ).sync;
var md2rst = require( './../../lib' ).fromBufferSync;

var data = readFile( path.resolve( __dirname, '../../README.md' ), {'encoding':'utf8'} );
var outFile = path.join( __dirname, './README.rst' );

var opts = {
	'flavor': 'github'
};

var rst = md2rst( new Buffer( data ), opts );
console.log( rst );

md2rst( outFile, new Buffer( data ), opts );
