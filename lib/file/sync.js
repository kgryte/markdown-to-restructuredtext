'use strict';

// MODULES //

var debug = require( 'debug' )( 'markdown-to-restructuredtext:file:sync' );
var exec = require( 'child_process' ).execSync;
var resolve = require( 'path' ).resolve;
var join = require( 'path' ).join;
var uuid = require( 'node-uuid' ).v4;
var copy = require( 'utils-copy' );
var cwd = require( 'utils-cwd' );
var typeName = require( 'type-name' );
var readFile = require( 'utils-fs-read-file' ).sync;
var unlink = require( 'fs' ).unlinkSync;
var tmp = require( 'utils-tmpdir' )();
var defaults = require( './../defaults.json' );
var validate = require( './../validate.js' );
var cmd = require( './../cmd.js' );


// VARIABLES //

var interfaces = {
	'string,string,Object': [ 0, 1, 2 ],
	'string,string': [ 0, 1, -1 ],
	'string,Object': [ -1, 0, 1 ],
	'string': [ -1, 0, -1 ]
};


// SYNC //

/**
* FUNCTION: sync( [dest,] src,[ options] )
*	Synchronously converts Markdown to reStructuredText.
*
* @param {String} [dest] - output reStructuredText file path
* @param {String} src - Markdown file path to convert
* @param {Object} [options] - function options
* @param {String} [options.flavor="gfm"] - Markdown flavor
* @returns {String|Void} generated reStructuredText or undefined
*/
function sync() {
	var outFile;
	var options;
	var inFile;
	var types;
	var dest;
	var opts;
	var src;
	var err;
	var dir;
	var str;
	var idx;
	var len;
	var out;
	var i;

	len = arguments.length;
	types = new Array( len );
	for ( i = 0; i < len; i++ ) {
		types[ i ] = typeName( arguments[ i ] );
	}
	types = types.join( ',' );
	idx = interfaces[ types ];
	if ( idx === void 0 ) {
		throw new Error( 'invalid input argument(s). No implementation matching `f('+types+')`.' );
	}
	if ( idx[ 0 ] >= 0 ) {
		dest = arguments[ idx[0] ];
	}
	src = arguments[ idx[1] ];
	if ( idx[ 2 ] >= 0 ) {
		options = arguments[ idx[2] ];
	}
	opts = copy( defaults );
	if ( options ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	dir = cwd();
	debug( 'Current working directory: %s', dir );

	inFile = resolve( dir, src );
	debug( 'Input file: %s', inFile );

	if ( dest === void 0 ) {
		outFile = join( tmp, uuid() );
	} else {
		outFile = resolve( dir, dest );
	}
	debug( 'Output file: %s', outFile );

	str = cmd( inFile, outFile, opts );
	debug( 'Command: %s', str );

	exec( str, {'cwd': dir} );
	if ( dest ) {
		return;
	}
	debug( 'Reading temporary output file: %s', outFile );
	out = readFile( outFile, {'encoding':'utf8'} );

	if ( out instanceof Error ) {
		debug( 'Error encountered while reading temporary output file %s: %s', outFile, out.message );
		throw out;
	}
	debug( 'Deleting temporary output file: %s', outFile );
	unlink( outFile );

	return out;
} // end FUNCTION sync()


// EXPORTS //

module.exports = sync;